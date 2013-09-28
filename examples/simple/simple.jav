object @foo {
  -copy

  set .bar, .qux

  object .inner {
    include '../includes/outerArray'
  }
}
