# n8n-nodes-microsoftclarity  

This is an n8n community node. It lets you interact with Microsoft Clarity in your n8n workflows.  

Microsoft Clarity is an user behavior analytics tool that provides session recordings, heatmaps, and insights to help businesses understand how users interact with their websites and improve overall site performance.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.  

[Installation](#installation)  
[Credentials](#credentials)    
[Operations](#operations)   
[Using as a Tool](#using-as-a-tool)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation  

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.  

Alternatively, you can manually install it:  

```sh  
git clone https://github.com/elevate-agency-data/n8n-nodes-microsoftclarity.git 
cd n8n-nodes-microsoftclarity 
npm install  
```  

Then, place the node file in the `~/.n8n/custom-nodes` directory (or follow instructions specific to your n8n installation).   

## Credentials  

To use this node, you need an Microsoft Clarity API key with access to Microsoft Clarity.  

## Operations  

This node supports the following operations within Microsoft Clarity:  

* **Data Export**
    - Gets report

Retrieve information from the [Microsoft Clarity API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api). 

## Using as a Tool

This node can be used as a tool in n8n AI Agents. To enable community nodes as tools, you need to set the `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` environment variable to `true`.

### Setting the Environment Variable

**If you're using a bash/zsh shell:**
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
n8n start
```

**If you're using Docker:**
Add to your docker-compose.yml file:
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you're using the desktop app:**
Create a `.env` file in the n8n directory:
```
N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you want to set it permanently on Mac/Linux:**
Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

## Compatibility  

- Tested with: 1.116.2 (Success)

## Resources  

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)  
- [Microsoft Clarity API documentation](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api)