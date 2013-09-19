ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?    

%%

^(\%\{)([^\\`]*(?:\\.[^\\`]*)*)(\%\}) %{
  yytext = "(function() { " + yytext.substr(2, yyleng - 4).trim() + "})();";
  return 'SCRIPTBLOCK';
%}

"###"(.|\n|\r)*?"###" %{
  yytext = yytext.substr(3, yyleng - 6).trim();
  return 'COMMENT_BLOCK';
%}

"#".*\r\n %{ 
  yytext = yytext.substr(1, yyleng - 3).trim();
  return 'COMMENT';
%}

"#".*(\r|\n) %{ 
  yytext = yytext.substr(1, yyleng - 2).trim();
  return 'COMMENT';
%}

"#".* %{ 
  yytext = yytext.substr(1, yyleng - 1).trim();
  return 'COMMENT';
%}

"'"(?:"\\"(?:.)|[^'\\])*"'" %{
  yytext = yytext.substr(1, yyleng - 2);
  return 'STRING'
%}


\s+             { /* skip whitespace */ }
"object"        { return 'OBJECT'; }
"array"         { return 'ARRAY'; }
"set"           { return 'SET'; }
"copy"          { return 'COPY'; }
"named"         { return 'NAMED'; }
"true"          { yytext = true; return 'TRUE'; }
"false"         { yytext = false; return 'FALSE'; }
"yes"           { yytext = true; return 'TRUE'; }
"no"            { yytext = false; return 'FALSE'; }
{ident}         { return 'IDENTIFIER'; } 
"=>"            { return 'NPOINTER'; }
"="             { return 'EQUALS'; }
"@"             { return 'THISTOKEN'; }
"."             { return 'DOT'; }
","             { return 'COMMA'; }
"+"             { return 'PLUS'; }
"-"             { return 'MINUS'; }
"["             { return 'OPEN_BRACKET'; }
"]"             { return 'CLOSE_BRACKET'; }
"{"             { return 'OPEN_BRACE'; }
"}"             { return 'CLOSE_BRACE'; }
<<EOF>>         { return 'EOF'; }