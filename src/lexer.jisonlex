ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?

%%

"\""(?:"\\"(?:.)|[^'\\])*"\"" %{
  yytext = yytext.substr(1, yyleng - 2);
  return 'STRING'
%}

\s+             { /* skip whitespace */ }
"object"        { return 'OBJECT'; }
"property"      { return 'PROPERTY'; }
"prop"          { return 'PROPERTY'; }
"array"         { return 'ARRAY'; }
"as"            { return 'AS'; }
"end"           { return 'END'; }
{ident}         { return 'IDENTIFIER'; } 
<<EOF>>         { return 'EOF'; }