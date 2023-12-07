import { runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

type handWithBid = {
    hand: string,
    bid: number
}

const valueMapper: Record<string, number> = {
    A: 13,
    K: 12,
    Q: 11,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1,
    J: 0,
};

function handType(hand: string): number { 
    const cards = hand.split("")

    const cardFreq: Record<string, number> = {}

    let jokerCount = 0 // count jokers separately

    for (let card of cards) {
        if (card === 'J') {
            jokerCount += 1
            continue
        }
        if (!(card in cardFreq)) {
            cardFreq[card] = 0
        }
        cardFreq[card] += 1
    }

    if (jokerCount == 5) {
        return 6 // 5 of a kind
    }

    // get the key with the highest value
    let highestKey = Object.keys(cardFreq).reduce((highestKey, currentKey) => {
        if (cardFreq[currentKey] > cardFreq[highestKey]) {
            return currentKey
        } else {
            return highestKey
        }
    }, Object.keys(cardFreq)[0])


    cardFreq[highestKey] += jokerCount

    let frequencies = Object.values(cardFreq).sort().reverse()


    switch (frequencies[0]) {
        case 5:
            return 6 // 5 of a kind
        case 4:
            return 5 // 4 of a kind
        case 3:
            if (frequencies[1] == 2) return 4 // full house
            return 3 // 3 of a kind
        case 2:
            if (frequencies[1] == 2) return 2 // 2 pair
            return 1 // 1 pair
        default: 
            return 0 // high card
    }
}

function customSort(handA: string, handB: string): number {
    let handAType = handType(handA)
    let handBType = handType(handB)

    if (handAType > handBType) {
        return -1
    } 
    if (handBType > handAType) {
        return 1
    } 
    
    for (let i = 0; i < 5; i++) {
        if (valueMapper[handA[i]] < valueMapper[handB[i]]) {
            return 1
        }
        if (valueMapper[handA[i]] > valueMapper[handB[i]]) {
            return -1
        }
    }
    
    return 0
}

function solution(input: string) {
    let handsAndBids = input.split("\n")
        .map((line) => {
            let handAndBid = line.split(" ")
            return {
                hand: handAndBid[0], 
                bid: parseInt(handAndBid[1])
            }
        })
    
    let sortedHandsAndBids = handsAndBids.sort( (handAndBidA, handAndBidB) =>
        customSort(handAndBidA.hand, handAndBidB.hand)
    ).reverse()
    
    let res = 0

    sortedHandsAndBids.forEach((handAndBid, index) => {
        res += handAndBid.bid * (index + 1)
    })

    console.log(sortedHandsAndBids)

    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)