ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?
number          ^(\d*\.?\d+)(?:"e"[+-]?\d+)?

%%

\s+             { /* skip whitespace */ }
(\r?\n)+        { return 'NEWLINE'; }

"--".*(\r|\n) %{ 
  yytext = yytext.substr(2, yyleng - 3).trim();
  return 'COMMENT';
%}

\"[^\"]*\"|\'[^\']*\' %{
  yytext = yytext.substr(1, yyleng - 2);
  return 'STRING'
%}

/* Keywords */
"object"        { return 'OBJECT'; }
"property"      { return 'PROPERTY'; }
"prop"          { return 'PROPERTY'; }
"array"         { return 'ARRAY'; }
"as"            { return 'AS'; }
"if"            { return 'IF'; }
"then"          { return 'THEN'; }
"elseif"        { return 'ELSE_IF'; }
"return"        { return 'RETURN'; }
"end"           { return 'END'; }
{number}        { return 'NUMBER'; }
{ident}         { return 'IDENTIFIER'; } 

/* Operators */
"and"           { return 'AND'; }
"or"            { return 'OR'; }
"not"           { return 'NOT'; }
"&&"            { return 'AND'; }
"||"            { return 'OR'; }
"!"             { return 'NOT'; }

/* Attributes */
"key"           { return 'ATTRIBUTE'; }

/* Glyphs */
"@"             { return 'GLOBAL_GLYPH'; }
"."             { return 'DOT'; }
","             { return 'COMMA'; }
"="             { return 'ASSIGN'; }
"["             { return 'OPEN_BRACKET'; }
"]"             { return 'CLOSE_BRACKET'; }
"("             { return 'OPEN_PARENTHESE'; }
")"             { return 'CLOSE_PARENTHESE'; }
<<EOF>>         { return 'EOF'; }