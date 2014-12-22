ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?
number          ^(\d*\.?\d+)(?:"e"[+-]?\d+)?
glyph           [+(){}\[\]|@:,.+]

%%

\s+             { /* skip whitespace */ }
"//".*(\r|\n)   { /* skip comments */ }
(\r?\n)+        { return 'NEWLINE'; }

\"[^\"]*\"|\'[^\']*\' %{
  yytext = yytext.substr(1, yyleng - 2);
  return 'STRING'
%}

/* Glyphs */
'=>'            { return '=>'; }
'->'            { return '->'; }
'{{'            { return '{{'; }
'}}'            { return '}}'; }
{glyph}         { return yytext; }

/* General */
{number}        { return 'NUMBER'; }
{ident}         { return 'IDENTIFIER'; }
<<EOF>>         { return 'EOF'; }