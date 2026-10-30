export const SITE = 'https://hostpilotpro.com';
export function pageSchema(title, description, route) {
  const fullTitle = title.includes('HostPilot') ? title : `${title} · HostPilot Pro`;
  const graph = [
    {'@type':'Organization','@id':SITE+'/#organization',name:'HostPilot Pro',alternateName:'HostPilotPro',url:SITE+'/',parentOrganization:{'@type':'Organization',name:'Mr Property Siam',url:'https://www.mrpropertysiam.com/'}},
    {'@type':'WebSite','@id':SITE+'/#website',name:'HostPilot Pro',url:SITE+'/',publisher:{'@id':SITE+'/#organization'}},
    {'@type':'WebPage','@id':SITE+route+'#webpage',url:SITE+route,name:fullTitle,description,inLanguage:'en',isPartOf:{'@id':SITE+'/#website'},about:{'@id':SITE+'/#software'}},
  ];
  if (route === '/' || route === '/full-suite') graph.push({
    '@type':'SoftwareApplication','@id':SITE+'/#software',name:'HostPilot Pro',alternateName:'HostPilotPro',applicationCategory:'BusinessApplication',operatingSystem:'Web',url:SITE+'/',description:'Property management software connecting villa operations, owner reporting, guest information and staff workflows around an existing channel manager.',publisher:{'@id':SITE+'/#organization'},
  });
  if (route !== '/') graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HostPilot Pro',item:SITE+'/'},{'@type':'ListItem',position:2,name:fullTitle,item:SITE+route}]});
  return {'@context':'https://schema.org','@graph':graph};
}
