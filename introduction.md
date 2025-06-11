# <img style="display: inline-block; margin-bottom: -7.5px; margin-right: 5px;" src="./assets/logo.png" alt="Logo" width="32"> **Rew**
Rew is basically a coffeescript runtime, it's written in rust and is focused on giving you an environment where you can use something like `rust` via ffi and get a binary-supported app going. 

As of now, rew is not another node js runtime, as it does not support node whatsoever, but that may change in the future.

The focus for rew is to make it a simpler way to make desktop apps or services that you'd otherwise make with rust/c.

Here, take a cup of coffee as you explore more about [**Rew**](#):
```coffee
package brewery;
import '#std!';

using namespace std::ns;

export function main()
  typef(str) brew = (coffee, sugar) ->
    coffee + sugar + 'ml'

  int @coffee = '30ml'

  sugar = input 'How much sugar(g)? ' |> int
  print 'Cup of coffee', brew @coffee, sugar
```