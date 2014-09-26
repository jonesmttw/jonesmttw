######Storing js functions for later use

[JS String Template Function tmpl](tmpl.js)

```javascript
var str = '<%0%> went to the <%1%>';
tmpl(str, ['Dan', 'Park']);
"Dan went to the Park"

// can reuse <% # %> as well
var str = '<%0%> am <%1%>, <%0%> am <%2%>';
tmpl(str, ['I', 'here', 'Ron Burgendy']);
"I am here, I am Ron Burgendy"
```