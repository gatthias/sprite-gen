# Sprite Generator

A small experiment with Sprite generation using cellular automata in the browser.  
Base implementation in C++ can be found at [@yurkth/sprator](https://github.com/yurkth/sprator).


## Theory

1. Generate 4x8 white noise.

   ![](https://user-images.githubusercontent.com/59264002/76070404-d38c0e00-5fd7-11ea-9ec2-674813c12490.png)

2. Change the state according to the following rules.

   - Any live cell with two or three neighbors survives.
   - Any dead cell with one or less live neighbors becomes a live cell.
   - All other live cells die in the next generation. Similarly, all other dead cells stay dead.

3. Repeat steps 2 several times.

   ![](https://user-images.githubusercontent.com/59264002/76137835-c8db8280-6084-11ea-80e8-68d436590d7b.png)

4. Flip and add a outline, complete!

   ![](https://user-images.githubusercontent.com/59264002/76070456-e56db100-5fd7-11ea-9fed-4c178bf0a756.png)

## License

This project is licensed under the MIT license. See the [LICENSE](/LICENSE) for more information.
