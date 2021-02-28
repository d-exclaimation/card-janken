# Card-Janken
Cardjitsu for Web and also Multiplayer...lol

I make a simple Card Jitsu Game Clone for Web but this time, it's multiplayer

Get randomly matched with an opponent using a complex algorithm called not doing anything to match anyone and just match by timing.

This is the [`iOS version`](https://github.com/d-exclaimation/CardJitsuClone) that is more polished on the client-side but not multiplayer 

# Game Mechanics
3 Steps of the game
> 1. Use a card
> 2. Win a card in a duel
> 3. Collect the right collection of cards

Each player will have 5 cards dealt randomly, and can only use one per turn
## Cards
Cards have 3 attributes or properties
- Color
- Element
- Power
This represent the card itself and its odd to win when you use it
### Win a card
Winning a card goes through 2 simple checks
> 1. Check if the element has an advantage
> 2. Check if the power number is larger

A won card will be sent to their respective owner's bank or collection

Note that `Color does not play an effect here`
## Banks
Banks are the collection of all won cards
> This can be accessed through the Show Bank Button

Collection system creates a new complexity within the game rather than a simple score

Winning a single card is fun, but is too simple and get boring too quickly

Instead, winning is determined with a certain scenarios
### Winning Collection
Two ways to win, both require 3 cards at least
> 1. 3 Unique cards with unique colors and unique elements
> 2. 3 Unique cards with unique colors but the same elements


# Builds aka Deployment

Coming soon, I need to pay for the servers so yeah, need to add security as well 

## Try it on your own
The game does not really require a proper database since all the state in handled on the client side and does not need to persist outside the game time aka if a user disconnect, Game Over!!

### Instruction on just using this
> 1. Get `NPM` or `Yarn` to run the `React App`
> 2. Get `Go` for the current or higher version with `Go Mod` enabled
> 3. Run the server using
```bash
$ go run .../card-janken/server/main.go
```
> Alternatively
```bash
$ cd .../card-janken/server/
$ go install
$ ~/go/bin/card-janken
```
> 4. Start the React App or Compile which ever fits
```bash
$ cd .../card-janken/app/
$ yarn dev | yarn start | yarn build | npm run dev | npm start | npm run build
```

# Codes

Similarly to the iOS Project, this project was suppose to teach me a couple concepts that I can use to build better things in the future. 

The primary focus is WebSocket with multiple client with plain `Go`

## WebSocket Go
I was interested in implementing a web-socket real-time connection using Go since it is very known to be good at networking and cocurrency.

This is true, the main thing I use is channels and goroutines, both seem to work well enough to build and manage real-time connection with several clients

```go

type Pool struct {
	Register 	chan *Client
	Unregister 	chan *Client
	Clients 	map[*Client] bool
	Broadcast 	chan *JankenChanges
	Store 		[]*JankenChanges
	Rooms       map[*Pool]bool
}

// Handle channels and goroutines mutating and send data
func (pool *Pool) Start() {
	for {
		select {
			case client := <-pool.Register:
				// Add to clients, and show size
				pool.Clients[client] = true

				// Notify when room is full
				if len(pool.Clients) == 2 {
					pool.Rooms[pool] = true
					log.Println("Full") // full
					pool.Notify("User connected")
				}
				break
			case client := <-pool.Unregister:
				// Delete all clients and delete self
				pool.DisconnectAll(client)
				pool.Notify("User disconnected")
				return
			case changes := <-pool.Broadcast:
				pool.Store = append(pool.Store, changes)
				if len(pool.Store) < 2 {
					break
				}
				pool.SendChanges()
		}
	}
}
```

Another focus is to integrate MobX to do MVVM in this as well, the original one uses MVVM and having that in a React App allows me to actually share a lot of code and learn a lot about State Management in React from my SwiftUI knowledge

```ts
export class JankenStore {
    engine: JankenEngine = new JankenEngine(colorPalette, elementPallete);
    multiplayer: boolean;
    socket: SocketStore | null;
    tempTable: JankenCard[] = [];

    constructor(multi = false) {
        // Something something, below are the important bits
        makeAutoObservable(this.engine);
        makeAutoObservable(this);
    }

    ...

    choose(index: number): void {
        // Choose a card and put into the wait queue for multiplayer
    }

    proceed(card: JankenCard | null = null): void {
        // Proceed aka continue the current game
    }

    restart(): void {
        // Change the engine to a new one, and re-make into observable
    }
}
```

# Lastly

```ts
const main = async (): void => {
    console.log(`Hello ${you}, enjoy the project`);
};

main().catch(console.log);
```

Apache-2.0 License Copyright © 2020 d-exclaimation
