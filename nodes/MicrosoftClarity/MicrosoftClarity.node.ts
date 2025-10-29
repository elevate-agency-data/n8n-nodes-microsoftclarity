import { 
	ApplicationError,
	INodeType, 
	INodeTypeDescription, 
	IExecuteFunctions, 
	NodeApiError,
  NodeConnectionTypes,
	NodeOperationError
} from 'n8n-workflow';

export class MicrosoftClarity implements INodeType {
	description: INodeTypeDescription = {
		name: 'microsoftClarity',
		displayName: 'Microsoft Clarity',
		group: ['transform'],
		version: 1,
		description: 'Use the Microsoft Clarity API',
    defaults:{ name: 'Microsoft Clarity' },
		icon: 'file:microsoftclarity.svg',
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],        
		usableAsTool: true,
		credentials: [{	name: 'microsoftClarityApi', required: true}],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Data Export', value: 'dataExport', description: 'Manage data exports' }
			  ],
				default: 'dataExport',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['dataExport'] } },
				options: [					
					{ name: 'Get Report', value: 'dataExportReportGet', action: 'Gets report', description: 'Gets report' }
				],
				default: 'dataExportReportGet',
			},
      {
        displayName: 'Query Parameters',
        name: 'queryParameters',
        type: 'collection',
        placeholder: 'Add Query Parameters',
        default:{},
        displayOptions:{ show:{ operation:['dataExportReportGet'] } },
        options:[
          {
            displayName: 'Dimension 1',
            name: 'dimension1',
            description: 'The first dimensions to break down insights',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Dimension 2',
            name: 'dimension2',
            description: 'The second dimensions to break down insights',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Dimension 3',
            name: 'dimension3',
            description: 'The third dimensions to break down insights',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Number Of Days',
            name: 'numOfDays',
            description: 'The number of days for the data export since the API call, relating to the last 24, 48, or 72 hours, respectively',
            type: 'number',
            typeOptions: { minValue:1, maxValue:3 },
            default: 1
          }
        ]
      }
		]
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];

		const credentials = await this.getCredentials('microsoftClarityApi');    
    const { tokenApi } = credentials as { tokenApi: string };
    if (!tokenApi) { throw new ApplicationError('Missing Token API.'); }
		
		// Traitement des opérations
		for (let i = 0; i < items.length; i++) {
			try {		        		
        		
       	const operation = this.getNodeParameter('operation', i, '') as string;		
        const resource = this.getNodeParameter('resource', i, '') as string;	
        const queryParameters = this.getNodeParameter('queryParameters', i, {}) as Record<string, string | number | boolean>;
        
        let url = 'https://www.clarity.ms';
      
        const queryParams = new URLSearchParams();
        Object.entries(queryParameters).forEach(([key, value]) => {
          if (value !== '') queryParams.append(decodeURIComponent(key), String(value));
        });
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
				
				switch (resource) {
          case 'dataExport':			          
            switch (operation) {
              case 'dataExportReportGet':      
                url += `/export-data/api/v1/project-live-insights${queryString}`;
                break;
            }
						break;
						break;		
					default:
            throw new NodeOperationError(this.getNode(),`Unknown resource:${resource}`);
				}

        const httpMethod: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT' =  operation.endsWith('Delete') ? 'DELETE' :
                                                                         operation.endsWith('Patch') ? 'PATCH' :
																																				 operation.endsWith('Put') ? 'PUT' :
																																				 operation.endsWith('Post') ? 'POST' : 'GET';

        let body;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenApi}`
        };

        const requestConf = {
          method: httpMethod,
          url,
          headers,
          ...(body ? { body } : {}),
        };

        console.log('url : ' + url);
        console.log('requestConf : ' + JSON.stringify(requestConf));

        const responseData = await this.helpers.httpRequest(requestConf);

        console.log('responseData : ' + responseData);

				if (typeof responseData === 'string') {
          const trimmed = responseData.trim();
          if (trimmed !== '') {
            try {
              returnData.push({ json: JSON.parse(trimmed) });
            } catch {
              returnData.push({ text: trimmed });
            }
          } else {
            returnData.push({ 'Status Code': '204 No Content' });
          }
        } else if (responseData) {
          returnData.push(responseData);
        } else {
          returnData.push({ 'Status Code': '204 No Content' });
        }        

			} catch (error) {
        throw new NodeApiError(this.getNode(), {
          message: `Error calling Microsoft Clarity API: ${error.message}`,
          description: error.stack || 'No stack trace available'
        });
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}