ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?
number          ^(\d*\.?\d+)(?:"e"[+-]?\d+)?
glyph           [@+\-*/%^<>=(){}\[\]:,.] 

%s as

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
"as"            { this.begin('as'); return 'AS'; }
"if"            { return 'IF'; }
"then"          { return 'THEN'; }
"elseif"        { return 'ELSEIF'; }
"else"          { return 'ELSE'; }
<as>"return"    { return 'RETURN'; }
"end"           { return 'END'; }
"true"          { return 'TRUE'; }
"false"         { return 'FALSE'; }
"null"          { return 'NULL'; }

/* Glyphs */
"<="            { return '<='; }
">="            { return '>='; }
"=="            { return '=='; }
"!="            { return '!='; }
{glyph}         { return yytext; }

/* Operators */
"and"           { return 'AND'; }
"or"            { return 'OR'; }
"not"           { return 'NOT'; }
"&&"            { return 'AND'; }
"||"            { return 'OR'; }
"!"             { return 'NOT'; }

/* Attributes */
"key"           { return 'ATTRIBUTE'; }

/* General */
{number}        { return 'NUMBER'; }
{ident}         { return 'IDENTIFIER'; } 
<<EOF>>         { return 'EOF'; }