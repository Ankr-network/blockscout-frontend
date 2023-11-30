export const goWss = `package main

import (
    "context"
    "fmt"
    "github.com/ethereum/go-ethereum/core/types"
    "github.com/ethereum/go-ethereum/ethclient"
    "time"
)

func main() {
    const url = "__url__"  // url string
    
    client, err := ethclient.Dial(url)
    
    if err != nil {
        panic(err)
    }
    
    ch := make(chan *types.Header, 1024)
    sub, err := client.SubscribeNewHead(context.Background(), ch)
    
    if err != nil {
        panic(err)
    }
    
    fmt.Println("---subscribe-----")

    go func() {
        time.Sleep(10 * time.Second)
        fmt.Println("---unsubscribe-----")
        sub.Unsubscribe()
    }()

    go func() {
        for c := range ch {
            fmt.Println(c.Number)
        }
    }()

    <-sub.Err()

}`;
