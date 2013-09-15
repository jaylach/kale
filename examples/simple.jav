object @test {
  
}

object @test => 'test' %{
  
%}

array @test.two %{
  function() {
    return 'blah';
  }
%}

array .test => 'one' {
  .one => 'two'
}

@test => 'testing'

.test => 'testing'