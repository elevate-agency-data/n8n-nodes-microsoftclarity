import { 
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon
} from 'n8n-workflow';

export class MicrosoftClarityApi implements ICredentialType {
	name = 'microsoftClarityApi';
	displayName = 'Microsoft Clarity API';
	documentationUrl = 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api';
  icon: Icon = 'file:icons/microsoftclarity.svg';
	properties: INodeProperties[] = [
    {
			displayName: 'Token API',
			name: 'tokenApi',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
			required: true,
			description: 'Token API for the Microsoft Clarity API'
		}
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
      method: 'GET',
			url: 'https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1&dimension1=OS',
			headers: {
        'Content-Type': 'application/json',
				'Authorization': '=Bearer {{$credentials.tokenApi}}'
			},
			json: true,
		},
	};
}
