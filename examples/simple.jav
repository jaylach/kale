###
  TEST
###

object @test {
  # Settings
  -named, -copy

  # Properties
  .foo, .bar, .baz

  # Array
  array .qux {
    .one => '1', .two => '2'
  }
}
