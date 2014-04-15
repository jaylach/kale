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
"@"             { return 'GLOBAL_GLYPH'; }
"."             { return 'DOT'; }
","             { return 'COMMA'; }
"["             { return 'OPEN_BRACKET'; }
"]"             { return 'CLOSE_BRACKET'; }
<<EOF>>         { return 'EOF'; }