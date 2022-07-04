var wordList = ["about","above","acres","adult","after","again","agree","ahead","alike","alive","allow","alone","along","aloud","among","angle","angry","apart","apple","arrow","aside","avoid","aware","badly","basic","basis","began","begun","being","below","birds","birth","black","blank","blind","block","blood","board","bound","brain","brass","brave","bread","break","brick","brief","bring","broad","broke","brown","brush","build","built","burst","cabin","canal","carry","catch","cause","chain","chair","chart","check","chest","chief","child","chose","class","claws","clean","clear","climb","clock","close","cloth","cloud","coach","coast","color","could","count","court","cover","crack","cream","cross","crowd","curve","daily","dance","death","depth","dirty","doing","doubt","dozen","drawn","dream","dress","dried","drink","drive","drove","eager","early","earth","eaten","eight","empty","enemy","enjoy","enter","equal","event","every","exact","exist","extra","fence","fewer","field","fifth","fifty","fight","final","first","flame","flies","floor","folks","force","forth","forty","found","frame","fresh","front","fruit","fully","funny","giant","given","glass","globe","goose","grade","grain","graph","grass","great","green","group","grown","guard","guess","guide","habit","happy","heard","heart","heavy","hello","honor","horse","house","human","hurry","image","judge","knife","known","label","labor","large","later","laugh","learn","least","leave","level","light","local","loose","lower","lucky","lunch","lungs","lying","magic","major","maybe","means","meant","metal","might","model","money","month","motor","mouse","mouth","movie","music","nails","needs","never","night","noise","north","noted","occur","ocean","offer","older","orbit","order","other","ought","outer","owner","paint","paper","parts","party","peace","piano","piece","pilot","pitch","place","plain","plane","plant","plate","point","porch","pound","power","press","price","pride","prize","proud","prove","pupil","queen","quick","quiet","quite","radio","raise","ranch","range","reach","ready","refer","rhyme","right","river","rocky","rough","round","route","ruler","saved","scale","scene","score","seems","sense","serve","seven","shade","shake","shall","shape","share","sharp","sheep","sheet","shelf","shine","shirt","shoot","shore","short","shout","shown","sides","sight","silly","since","skill","slabs","slave","sleep","slept","slide","slope","small","smell","smile","smoke","snake","solar","solid","solve","sound","south","space","speak","speed","spell","spend","spent","spite","split","sport","stage","stand","start","state","steam","steel","steep","stems","stick","stiff","still","stock","stone","stood","store","storm","story","stove","straw","strip","stuck","sugar","sweet","swept","swing","swung","table","taken","tales","taste","teach","tears","teeth","thank","there","these","thick","thing","think","third","those","three","threw","throw","thumb","tight","tired","title","today","topic","total","touch","tower","trace","track","trade","trail","train","tribe","trick","tried","truck","trunk","truth","twice","uncle","under","union","until","upper","using","usual","value","vapor","visit","voice","vowel","wagon","waste","watch","water","weigh","whale","wheat","wheel","where","which","while","white","whole","whose","women","world","worry","worse","worth","would","write","wrong","wrote","young","youth","zebra"];

function words(options) {

  function word() {
    if (options && options.maxLength > 1) {
      return generateWordWithMaxLength();
    } else {
      return generateRandomWord();
    }
  }

  function generateWordWithMaxLength() {
    var rightSize = false;
    var wordUsed;
    while (!rightSize) {  
      wordUsed = generateRandomWord();
      if(wordUsed.length <= options.maxLength) {
        rightSize = true;
      }

    }
    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one word
  if (typeof(options) === 'undefined') {
    return word();
  }

  // Just a number = return that many words
  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  
  // not a number = one word par string
  if (typeof(options.wordsPerString) !== 'number') {
    options.wordsPerString = 1;
  }

  //not a function = returns the raw word
  if (typeof(options.formatter) !== 'function') {
    options.formatter = (word) => word;
  }

  //not a string = separator is a space
  if (typeof(options.separator) !== 'string') {
    options.separator = ' ';
  }

  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  var token = '';
  var relativeIndex = 0;

  for (var i = 0; (i < total * options.wordsPerString); i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    }
    else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = ''; 
      relativeIndex = 0;
    }
   
  }
  if (typeof options.join === 'string') {
    results = results.join(options.join);
  }

  return results;
}

module.exports = words;
// Export the word list as it is often useful
words.wordList = wordList;
