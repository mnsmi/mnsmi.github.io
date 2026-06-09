const Attribute = "data-polyfill";
const provider = document.documentElement;
const j = provider.getAttribute(Attribute);
provider.removeAttribute(Attribute);
try
{
	if(j) eval(j);
} catch (_e) {
  // console.log(e);
}
