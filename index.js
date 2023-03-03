const emotions = {
  fearful: {
    scared: {
      helpless: null,
      frightened: null
    },
    anxious: {
      overwhelmed: null,
      worried: null
    },
    insecure: {
      inadequate: null,
      inferior: null
    },
    weak: {
      worthless: null,
      insignificant: null
    },
    rejected: {
      excluded: null,
      persecuted: null
    },
    threatened: {
      nervous: null,
      exposed: null
    }
  },
  angry: {
    "let down": {
      betrayed: null,
      resentful: null
    },
    humiliated: {
      disrespected: null,
      ridiculed: null
    },
    bitter: {
      indignant: null,
      violated: null
    },
    mad: {
      furious: null,
      jealous: null
    },
    aggressive: {
      provoked: null,
      hostile: null
    },
    frustrated: {
      infuriated: null,
      annoyed: null
    },
    distant: {
      withdrawn: null,
      numb: null
    },
    critical: {
      sceptical: null,
      dismissive: null
    }
  },
  disgusted: {
    disapproving: {
      judgmental: null,
      embarrased: null
    },
    disappointed: {
      appalled: null,
      revolted: null
    },
    awful: {
      nauseated: null,
      detestable: null
    },
    repelled: {
      horrified: null,
      hesitant: null
    }
  },
  sad: {
    hurt: {
      embarrased: null,
      disappointed: null
    },
    depressed: {
      inferior: null,
      empty: null
    },
    guilty: {
      remorseful: null,
      ashamed: null
    },
    despair: {
      powerless: null,
      grief: null
    },
    vulnerable: {
      fragile: null,
      victimised: null
    },
    lonely: {
      abandoned: null,
      isolated: null
    }
  },
  happy: {
    optimistic: {
      inspired: null,
      hopeful: null
    },
    trusting: {
      intimate: null,
      sensitive: null
    },
    peaceful: {
      thankful: null,
      loving: null
    },
    powerful: {
      creative: null,
      courageous: null
    },
    accepted: {
      valued: null,
      respected: null
    },
    proud: {
      confident: null,
      successful: null
    },
    interested: {
      inquisitive: null,
      curious: null
    },
    content: {
      joyful: null,
      free: null
    },
    playful: {
      cheeky: null,
      arousted: null
    }
  },
  surprised: {
    excited: {
      energetic: null,
      eager: null
    },
    amazed: {
      awe: null,
      astonished: null
    },
    confused: {
      perplexed: null,
      disillusioned: null
    },
    startled: {
      dismayed: null,
      shocked: null
    }
  },
  bad: {
    tired: {
      unfocussed: null,
      sleepy: null
    },
    stressed: {
      "out of control": null,
      overwhelmed: null
    },
    busy: {
      rushed: null,
      pressured: null
    },
    bored: {
      apathetic: null,
      indifferent: null
    }
  }
};
let previousItem = null;

const appendEmotion = (container, text) => {
  let levelItem = document.createElement("div");
  levelItem.classList.add("item");
  let label = document.createElement("label");
  label.innerText = text;
  levelItem.appendChild(label);
  if (previousItem) {
    previousItem.appendChild(levelItem);
  } else {
    container.appendChild(levelItem);
  }
  return levelItem;
};

// const parentKeysTotal = (obj, level) => {
//   if (!level) level = 1;
//   Object.keys(obj).map(key => {
//     totalKeysCount += Object.keys(parentObj[key]).length;
//     if (lvl == 3) {

//     }
//   });
//   return 0;
// }

const digDeep = (obj, lvl, parentObj, parentIndex) => {
  if (!lvl) lvl = 1;
  if (!parentIndex) parentIndex = null;
  if (!obj) return;

  let levelDiv = document
    .getElementById(`level${lvl}`)
    .querySelector(".labels");
  if (levelDiv.length == 0) return;

  let objKeys = Object.keys(obj);
  let keysCount = objKeys.length;
  if (parentObj) {
    let totalKeysCount = 0;
    Object.keys(parentObj).map((key) => {
      totalKeysCount += Object.keys(parentObj[key]).length;
    });
    keysCount = totalKeysCount;
  }

  let rotate = Math.floor(360 / keysCount);
  if (lvl == 3) rotate = 4.39;

  if (
    previousItem &&
    previousItem.closest(".donut").getAttribute("id") != `level${lvl}`
  )
    previousItem = null;

  objKeys.map((key) => {
    let item = appendEmotion(levelDiv, key);
    item.style.transform = `rotate(${rotate}deg)`;
    previousItem = item;

    setTimeout(() => {
      digDeep(obj[key], lvl + 1, obj, objKeys.indexOf(key));
    }, lvl);
  });
};

digDeep(emotions);
