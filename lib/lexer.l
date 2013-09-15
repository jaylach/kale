ident           ^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))? 
strident        (\'([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?\')
scriptblock     ^(\%\{)([^\\`]*(?:\\.[^\\`]*)*)(\%\})

%%

\s+             { /* skip whitespace */ }
"object"        { return 'OBJECT'; }
"array"         { return 'ARRAY'; }
"set"           { return 'SET'; }
{ident}         { return 'IDENTIFIER'; } 
{strident}      { return 'STRIDENTIFIER'; }
"=>"            { return 'NPOINTER'; }
"@"             { return 'THISTOKEN'; }
"."             { return 'DOT'; }
"{"             { return 'OPENBRACE'; }
"}"             { return 'CLOSEBRACE'; }
{scriptblock}   { return 'SCRIPTBLOCK'; }
\n              { return 'TERMINATOR'; }
<<EOF>>         { return 'EOF'; }