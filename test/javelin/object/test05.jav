object @foo {
  -copy

  set .bar, .qux

  object .inner
  array @outerObject {
    .'1' => 'one'
    .'2' => 'two'
  }
}