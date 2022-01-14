import { LessonType, ModuleType } from './types';
import imgIntro from './assets/lesson1_intro.png';
import img2 from './assets/lesson1_img2.png';
import imgPreviewLesson2 from './assets/medal.png';

export const lesson1: LessonType = {
  id: 'lesson1',
  nextLessonId: 'lesson2',
  index: '1',
  title: 'Intro to Bitcoin',
  timeToRead: '5 min read',
  imgPreview: imgPreviewLesson2,
  blocks: [
    {
      id: '1',
      blockContent: [
        {
          type: 'img',
          img: {
            src: imgIntro,
            alt: 'Intro to bitcoin image',
            copyright: 'Source: Bitrefill',
          },
        },
        {
          type: 'ankr',
          messagesList: [
            'Before we dive deeper into Web3, it’s important to know a little bit about what got us here. It’s not like Bitcoin is a necessary part of Web3 (in fact, most of Web3 functions just fine never interacting with Bitcoin at all), but blockchain technology and cryptocurrency are two foundational elements of Web3 — and the best way to understand blockchain and crypto is probably starting with Bitcoin.',
            'And so, alas, down the rabbit hole we go!',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'I guess it’s as good a time as any…',
      },
    },
    {
      id: '2',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'The Bitcoin white paper was published in 2008, and the network officially went online in January 2009. Before Bitcoin, many cryptographers and computer scientists tried to spawn other cryptocurrencies that just simply never took off for one reason or another.',
            'Bitcoin was the first cryptocurrency that successfully solved the “double-spend” problem, preventing the digital currency from being spent more than once. With this novel innovation, Bitcoin outshone all its predecessors.',
            'There’s so much we could tell you about Bitcoin, but the most important thing is that it succeeded. It became the world’s first decentralized, trustless, digital currency.',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'Congrats, Bitcoin. You did it!',
      },
    },
    {
      id: '3',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'Due to the timing of Bitcoin’s creation, many consider that the housing market crash of 2008 and other irresponsible fiscal policies inspired its release in some way, or at the very least, coincided with its necessity.',
            'In fact, there’s a message encoded in the first block on the Bitcoin blockchain. It reads: “The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.” Many consider this message to not just be a timestamp, but also a political statement.',
            'Global monetary policy at this time was largely a disaster that was brought on by the irresponsibility of governments and centralized banking systems. Bitcoin presented a solution. It was a new way to transact peer-to-peer with no government oversight or interference.',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'Sounds good!',
      },
    },
    {
      id: '4',
      blockContent: [
        {
          type: 'ankr',
          messagesList: ['First up, store of value.'],
        },
        {
          type: 'text',
          messagesList: [
            'You will often hear of bitcoin referred to as a “store of value.” That means it is a great way to save or hold the value you have accumulated from other sources like your income. If you hold money in a normal savings account at a bank, inflation will eat away at its value. But with bitcoin, the value of BTC has risen significantly every year. Bitcoin’s use as a store of value is why it has earned the nickname “digital gold.”',
          ],
        },
        {
          type: 'img',
          img: {
            src: img2,
            alt: 'Bitcoin stairs image',
            copyright: 'Source: Time.com',
          },
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'Digital gold, got it. Next up?',
      },
    },
    {
      id: '5',
      blockContent: [
        {
          type: 'ankr',
          messagesList: ['Next up is unit of account.'],
        },
        {
          type: 'text',
          messagesList: [
            'Increasingly, we are beginning to view bitcoin and other cryptocurrencies as units of account. In other words, we think of things in terms of how much something is worth in bitcoin, usually as a decimal point for smaller purchases (e.g., 0.001 BTC). We also see this increasingly with Ethereum, the second-largest cryptocurrency, as we use it more commonly with things like NFTs and gas fees to interact with Web3 dApps on the network.',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText:
          'Got it. So this would be like saying my car costs 0.5 BTC.',
      },
    },
    {
      id: '6',
      blockContent: [
        {
          type: 'ankr',
          messagesList: ['Spot on. Lastly we have medium of exchange.'],
        },
        {
          type: 'text',
          messagesList: [
            'Much of Bitcoin’s original whitepaper centered around the fact that it could be used as a method of peer-to-peer payment, meaning that having intermediaries like governments, banks, or companies like PayPal or Venmo facilitate transactions would no longer be necessary. Since bitcoin can easily be exchanged for USD or any other fiat currency, and it is increasingly accepted by merchants like Tesla (or whole countries like El Salvador), it is increasingly useful as a medium of exchange.',
          ],
        },
      ],
      userAction: {
        type: 'radio',
        question:
          'If you paid for your ice cream with bitcoin in El Salvador, this would be an example of bitcoin as what?',
        controls: [
          {
            isCorrect: false,
            label: 'Store of value',
            value: 'store',
          },
          {
            isCorrect: false,
            label: 'Unit of account',
            value: 'unit',
          },
          {
            isCorrect: true,
            label: 'Medium of exchange',
            value: 'exchange',
          },
        ],
        buttonText: 'What else can Bitcoin be used for?',
      },
    },
    {
      id: '7',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'Many who buy BTC do so as a hedge against inflation, since it has a hardcoded supply. Bitcoin is a deflationary currency and asset with a fixed supply of 21 million BTC; there will never be any more than that amount.',
            'Many who buy BTC do so as a hedge against inflation of fiat currencies. However, some argue that this works against bitcoin’s use as a medium of exchange, because it incentivizes people to hold on to it rather than spend it.',
            'On the other hand, inflationary fiat currencies encourage people to spend money which hastens what economists call the “velocity of money.” If people spend and share their money quickly to buy goods and services, it is a good indicator of a healthy economy. However, fiat currency and printing money at will might be much more problematic than Bitcoin’s sound money mechanisms.',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText:
          'A possible hedge against inflation, got it. Anything else?',
      },
    },
    {
      id: '8',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'Yes, Bitcoin has a more equitable supply model than most fiat currencies. Bitcoin’s fixed supply creates an advantage over the U.S. dollar, for example.',
            'Bitcoin “mining” is the process that mints more BTC into existence through a mechanism called “Proof of Work (PoW).” Essentially, PoW requires a numerical puzzle to be solved to mint new BTC and process transactions on the network.',
            'PoW is designed so that as the number of people trying to solve the puzzle increases, so does the difficulty. Nowadays, it’s nearly impossible for an individual miner to solve a PoW puzzle, and it’s up to large coalitions of miners acting as a group, or a “pool,” to combine their computing resources and work together to do so.',
            'The amount of new BTC that is distributed to miners in these pools is dependent upon how much work each miner contributed to the PoW solution. The rules of this system known as PoW are all hard-coded, transparently available, and are inalterable. Anyone can participate and stand to benefit.',
            'In contrast, when the U.S. Government decides to print more money, it’s typically distributed to people or organizations closest to the government who get access to this money, typically in low-interest loans. By the time a dollar reaches low-income citizens, it is used up, tattered, and worth less than when it was printed. This is not a fair and equal way of distributing dollars equally into the economy.',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText:
          'Okay I think I get it. How does Bitcoin relate to Web3 then?',
      },
    },
    {
      id: '9',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'Now that we’ve gotten all that technical stuff out of the way, we can dive more into this topic.',
            'Bitcoin is often referred to as an “internet-native” currency with no physical representation. It is easy to send, receive, and store bitcoin online with blockchain technology. Although other cryptocurrencies are more commonly used to interact and participate in Web3 applications and DeFi, Bitcoin paved the way — Bitcoin walked so its successors could run.',
            'And though bitcoin is not as widely used as other cryptocurrencies in Web3, bitcoin can still be wrapped to be deployed on, for example, Ethereum-based Web3 platforms.',
          ],
        },
      ],
      userAction: {
        type: 'radio',
        question: 'Why is bitcoin considered a hedge against inflation?',
        controls: [
          {
            isCorrect: false,
            label: 'It is considered a volatile asset',
            value: 'considered',
          },
          {
            isCorrect: false,
            label: 'It can be stored on a hard drive',
            value: 'stored',
          },
          {
            isCorrect: true,
            label: 'It has a fixed supply and historically increases in value',
            value: 'fixed',
          },
          {
            isCorrect: false,
            label: 'Governments are beginning to regulate digital assets',
            value: 'governments',
          },
        ],
        buttonText: 'But what makes Bitcoin and crypto valuable?',
      },
    },
    {
      id: '10',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'We’ve touched on this a bit already, but the answer is the same thing that makes gold valuable. Besides its usefulness as a conductor, gold is no more useful than any other element. But due to its shiny and rare nature, we consider it to be extremely valuable. ',
            'Bitcoin is the same because of its scarce maximum supply of 21,000,000 BTC. And, like gold, there is a labor-intensive process to “mine” it. So because it is scarce, requires work to mine, and fulfills all three uses of money, Bitcoin has tangible, real-world value. And there are plenty of other cryptocurrencies that provide even more benefits — as you’re likely aware — that we will get into in later courses.',
          ],
        },
      ],
      userAction: {
        type: 'checkbox',
        question: 'Why is bitcoin valuable?',
        controls: [
          {
            isCorrect: true,
            label: 'It is rare',
            value: 'rare',
          },
          {
            isCorrect: true,
            label: 'It has a fixed supply',
            value: 'fixed',
          },
          {
            isCorrect: false,
            label: 'It fulfills all traditional and new uses of currency',
            value: 'currency',
          },
          {
            isCorrect: false,
            label: 'It requires intense labor to “mine”',
            value: 'requires',
          },
          {
            isCorrect: false,
            label: 'All of the above',
            value: 'all',
          },
        ],
        buttonText: 'So did Bitcoin directly lead to other cryptocurrencies?',
      },
    },
    {
      id: '11',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'Yes, Bitcoin was only the beginning of crypto. Now, there are thousands of other cryptocurrencies and tokens, each with their own benefits and use cases. Later in Ankr Academy, we’ll go over how to differentiate cryptos with real value from those that offer little in the way of utility. ',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'And Bitcoin also directly leads to Web3?',
      },
    },
    {
      id: '12',
      blockContent: [
        {
          type: 'text',
          messagesList: [
            'That connection is a little bit less direct. Bitcoin was a huge technological breakthrough for decentralized money, and decentralization is the cornerstone of Web3… so, in a sense, yes.',
            'Perhaps it’s best to say that Bitcoin was the first of a long series of dominoes to fall that led to the revolutionary Web3 movement — the movement that includes blockchain and cryptocurrencies, DeFi, the metaverse, and many other decentralized applications that are beginning to form a whole new version of the internet. ',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'Got it!',
      },
    },
    {
      id: '13',
      blockContent: [
        {
          type: 'ankr',
          messagesList: [
            'Nice. You just finsish your first class.',
            'What do you feel?',
          ],
        },
      ],
      userAction: {
        type: 'rate',
      },
    },
    {
      id: '14',
      blockContent: [
        {
          type: 'ankr',
          messagesList: [
            'We appreciate your feedback!',
            'You’ve completed 9% of the track thus far.',
            'Let’s keep up the momentum! We’re happy to guide you through this journey and bring you the next class. Up next, we focus on who Ankr is, why you should care, and how we contribute to the web3 ecosystem.',
          ],
        },
      ],
      userAction: {
        type: 'next',
      },
    },
  ],
};

export const lesson2: LessonType = {
  id: 'lesson2',
  nextLessonId: 'lesson1',
  index: '2',
  title: 'What Is DeFi?',
  timeToRead: '5 min read',
  imgPreview: imgPreviewLesson2,
  blocks: [
    {
      id: '11',
      blockContent: [
        {
          type: 'ankr',
          messagesList: [
            'Hey there!',
            'Welcome to the second Academy lesson.',
            'Sometimes you may see a specialized highlighted words. Hover your cursor over it to see the definition.',
          ],
        },
        {
          type: 'text',
          messagesList: [
            'Now that you have some more details about how the traditional, centralized financial system operates, it’s time to introduce the financial system of the future and the one we’re currently trying to build: decentralized finance (or DeFi). “DeFi” is more than just a trendy tech company buzzword, and it’s about more than just cryptocurrency and blockchain technology. Yes, these technologies form the technological backbone of the DeFi space, but they’re more about the “how” than the “why” of DeFi. At its core, the ethos of DeFi is about giving power back to the people. It entails a process of decentralizing the current financial system that is dominated by banks, governments, and monetary policies that benefit big businesses over individuals.',
            'Simply put, the DeFi movement is trying to facilitate the exact same financial services you know and use today — like banking, borrowing and lending, trading, investing, and earning interest, among others — and streamlining these services by removing the legacy players and unnecessary middlemen. DeFi relies on some innovative technologies like blockchain to eliminate the need for expensive, slow, and inefficient middlemen that take their cut every time you use a financial service. By reducing overhead and making these financial services more efficient, they become more accessible, cheaper, and quicker than ever before. And without paying the centralized middlemen, there’s more money leftover on the table for you, the individual user.',
          ],
        },
      ],
      userAction: {
        type: 'button',
        buttonText: 'Sounds great. Tell more about how DeFi can benefit me?',
      },
    },
    {
      id: '12',
      blockContent: [
        {
          type: 'ankr',
          messagesList: [
            'Hey there!',
            'Welcome to the first Academy lesson.',
            'Sometimes you may see a specialized highlighted words. Hover your cursor over it to see the definition.',
          ],
        },
        {
          type: 'text',
          messagesList: [
            'Now that you have some more details about how the traditional, centralized financial system operates, it’s time to introduce the financial system of the future and the one we’re currently trying to build: decentralized finance (or DeFi). “DeFi” is more than just a trendy tech company buzzword, and it’s about more than just cryptocurrency and blockchain technology. Yes, these technologies form the technological backbone of the DeFi space, but they’re more about the “how” than the “why” of DeFi. At its core, the ethos of DeFi is about giving power back to the people. It entails a process of decentralizing the current financial system that is dominated by banks, governments, and monetary policies that benefit big businesses over individuals.',
            'Simply put, the DeFi movement is trying to facilitate the exact same financial services you know and use today — like banking, borrowing and lending, trading, investing, and earning interest, among others — and streamlining these services by removing the legacy players and unnecessary middlemen. DeFi relies on some innovative technologies like blockchain to eliminate the need for expensive, slow, and inefficient middlemen that take their cut every time you use a financial service. By reducing overhead and making these financial services more efficient, they become more accessible, cheaper, and quicker than ever before. And without paying the centralized middlemen, there’s more money leftover on the table for you, the individual user.',
          ],
        },
      ],
      userAction: {
        type: 'next',
      },
    },
  ],
};

export const module1: ModuleType = {
  lesson1,
  lesson2,
};
