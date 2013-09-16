ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?    

%%

"'"(?:"\\"(?:.)|[^'\\])*"'" %{
  yytext = yytext.substr(1, yyleng - 2);
  return 'STRING'
%}

^(\%\{)([^\\`]*(?:\\.[^\\`]*)*)(\%\}) %{
  yytext = yytext.substr(2, yyleng - 4).trim();
  return 'SCRIPTBLOCK';
%}

\s+             { /* skip whitespace */ }
"object"        { return 'OBJECT'; }
"array"         { return 'ARRAY'; }
"set"           { return 'SET'; }
{ident}         { return 'IDENTIFIER'; } 
"=>"            { return 'NPOINTER'; }
"@"             { return 'THISTOKEN'; }
"."             { return 'DOT'; }
","             { return 'COMMA'; }
"["             { return 'OPENBRACKET'; }
"]"             { return 'CLOSEBRACKET'; }
"{"             { return 'OPENBRACE'; }
"}"             { return 'CLOSEBRACE'; }
\n              { return 'TERMINATOR'; }
<<EOF>>         { return 'EOF'; }