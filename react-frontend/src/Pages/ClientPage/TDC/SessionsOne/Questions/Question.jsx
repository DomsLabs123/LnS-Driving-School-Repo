import React from 'react';

import RoadSign1 from '@/assets/TdcVideos/tdcQuestionImg/roadsign1.png'
import RoadSign2 from '@/assets/TdcVideos/tdcQuestionImg/roadsign2.png'
import RoadSign3 from '@/assets/TdcVideos/tdcQuestionImg/roadsign3.png'
import RoadSign4 from '@/assets/TdcVideos/tdcQuestionImg/roadsign4.png'
import RoadSign5 from '@/assets/TdcVideos/tdcQuestionImg/roadsign5.png'
import RoadSign6 from '@/assets/TdcVideos/tdcQuestionImg/roadsign6.png'

export const QuizQuestionTypes = {
  TEXT_ONLY: 'text_only',
  WITH_IMAGE: 'with_image',
};

export const quizQuestions = [
  {
    id: 1,
    question: "Who is a Professional Driver? (Sino ang propesyonal na drayber?)",
    options: [
      "A. An expert and experienced driver (isang eksperto at ekspiryensado sa pagmamaneho)",
      "B. Any driver who can operate a specific motor vehicle category (sinumang drayber na nakapagmaneho ang isang uri ng sasakyang de-motor)", 
      "C. Any driver who has a qualification to drive a Private or For Hire Vehicle (sinumang drayber na may kwalipikasyong magmaneho ng pribado o paupahang sasakyang de-motor)"
    ],
    correctAnswer: "C",
    image: null,
  },
  {
    id: 2,
    question: "How many days do you need to settle a traffic violation with LTO? (Ilang araw dapat asikasuhin sa LTO ang PAGLABAG sa batas trapiko?)",
    options: [
      "A. Within 15 days(Sa loob ng 15 araw)", 
      "B. Within 10 days(Sa loob ng 10 araw)", 
      "C. Within 30 days(Sa loob ng 30 araw)"
    ],
    correctAnswer: "A",
    image: null,
  },
  {
    id: 3,
    question: "what is the maximum validity of license that a driver may have if he/she has no traffic violation at the time of renewal? (Ilang taon ang maaring ibigay na lisensya sa isang drayber na walang traffic violation?)",
    options: [
      "A. 5 years validity", 
      "B. 10 years validity", 
      "C. 15 years validity", 
    ],
    correctAnswer: "B",
    image: null,
  },
  {
    id: 4,
    question: "Can a driver be given a 10-year license if he/she has traffic violation/s? (Maaring bang bigyan ng 10 taon na lisensya ang isang drayber kung ito ay mayroong huli o traffic violation",
    options: [
      "A. No (hindi)", 
      "B. Yes (Oo)", 
      "C. Yes - if all penalties are paid 15 days prior to renewal (Oo kung ang penalty ay nabayraan labin-limang araw bago mag-renew)", 
    ],
    correctAnswer: "A",
    image: null,
  },
  {
    id: 5,
    question: "What is the allowed age to apply for Non Professional driver's license? (Ano ang tamang edad upang magkaroon ng lisensya?)",
    options: [
      "A. 16 years old", 
      "B. 17 years old", 
      "C. 20 years old", 
    ],
    correctAnswer: "B",
    image: null,
  },
  {
      id: 6,
      question: "Registration of motor vehicle may be suspended if: (Maaring isuspinde ang rehistro ng sasakyan kung ito ay:)",
      options: [
        "A. motor vechicle is found  to be in comformity with regulation (kung ang sasakyan ay maayos na nakapasa sa inspeksyon)", 
        "B. motor vechicle is found to be unsightly (ang sasakyan ay hindi kaaya-aya)", 
        "C. motor vechicle is not register to the driver at the time of apprehension ( ang sasakyan ay hindi rehistrado sa nagmamaneho sa oras ng pagkahuli nito)", 
      ],
      correctAnswer: "B",
      image: null,
  },
  {
      id: 7,
      question: "Where do you need to display your plate number? (Saan dapat ilagay ang plaka ng isang sasakyan?)",
      options: [
        "A. one in front and one in the rear of the vehicle (isa sa harap at isa sa likod ng sasakyan)", 
        "B. two in front (dalawa sa harap)", 
        "C. one in the front windshield and one at the back windshield (isa sa harap na windshield at isa sa likurang salamin)", 
      ],
      correctAnswer: "A",
      image: null,
  },
  {
      id: 8,
      question: "This traffic sign means 'Yield the right of way' (Ang senyas trapiko na ito ay nangangahulugang 'magbigay daan':)",
      options: [
        "A. inverted triangle (baligtad na tatsulok) ", 
        "B. vertical triangle (patayong tatsulok)", 
        "C. horizontal triangle (pahalang na tatsulok)", 
      ],
      correctAnswer: "A",
      image: null,
  },
  {
      id: 9,
      question: "What is the main purpose of traffic laws, rules and regulations? (Ano ang pangunahing layunin ng mga batas, alituntunin at regulasyongpantrapiko?)",
      options: [
        "A. To generate revenues for the government (Upang kumita ng pera ang pamahalaan)", 
        "B. To discipline the motorists (Disiplinahin ang mga motorista)", 
        "C. To put order on the road (Magkaroon ng maayos na galaw ang mga sasakyan at ang mga tumatawid sa kalsada)", 
      ],
      correctAnswer: "C",
      image: null,
  },
  {
      id: 10,
      question: "Green light at an intersection means: (Ang kulay berdeng ilaw sa isang interseksiyon ay nangangahulugan na:)",
      options: [
        "A. pedestrians are allowed to cross all pedestrian lanes (pinahihintulutang tumawid sa lahat ng tawiran ang mga tao)", 
        "B. pedestrians are not allowed to cross all pedestrian lanes (hindi pinahihintulutang tumawid sa lahat ng tawiran ang mga tao)", 
        "C. the vehicles on the other street are stopped (ang mga sasakyan sa kabilang kalsada ay nakahinto)", 
      ],
      correctAnswer: "B",
      image: null,
  },
  {
    id: 11,
    question: "Flashing yellow light means: (Ang kumikisap-kisap na dilaw na ilaw pantrapiko ay nangangahulugan na:)",
    options: [
      "A. slowdown and proceed with caution (bagalan ang takbo at dumiretso nang may pag-iingat)", 
      "B. you have the right of way over a flashing yellow light (ikaw ang may higit na karapatan kaysa sa kumikisap-kisap na dilawna ilaw)", 
      "C. vehicles will be crossing from the other side (may mga sasakyang tatawid mula sa kabila)", 
    ],
    correctAnswer: "A",
    image: null,
},
{
  id: 12,
  question: "Parking is allowed if the vehicle is (Pinahihintulutan ang pagparada kung ang sasakyan ay_))",
  options: [
    "A. beyond 4 meters of a fire hydrant (lampas 4 na metro sa boka-insendiyo)", 
    "B. within 3 meters of the intersection of curve lines (nasa loob ng 3 metro ng interseksiyon ng mga linyang kurbada)", 
    "C. on the intersection (nasa interseksyon)", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 13,
  question: "Normally, on a two-lane road, overtaking is allowed at the: (Sa kalsadang pandalawahang sasakyan, ang pag-overtake ay pinahihintulutan sa:)",
  options: [
    "A. shoulder or pavement of the road (kanang bahagi ng kalsada o bangketa)", 
    "B. blind curve with a yellow solid line (kurbada/blind curve na may buong linyang dilaw) ", 
    "C. blind curve with a yellow solid line (kurbada/blind curve na may buong linyang dilaw)", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 14,
  question: "blind curve with a yellow solid line (kurbada/blind curve na may buong linyang dilaw)",
  options: [
    "A. blind curve with a yellow solid line (kurbada/blind curve na may buong linyang dilaw)", 
    "B. At a red traffic light (Kapag pula ang ilaw trapiko)", 
    "C. At an intersection (Kapag nasa interseksyon)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 15,
  question: "The proper hand signal for a right turn is: (Ang tamang senyas ng kamay kapag kumakanan ay:)",
  options: [
    "A. left arm pointing left (ang kaliwang braso nakaturo sa kaliwa)", 
    "B. left arm held pointing upward (ang kaliwang braso ay nakaturo sa itaas)", 
    "C. left arm held down, hand pointing at ground (ang kaliwang braso ay nakapababa, na ang kamay ay nakaturo saibaba)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 16,
  question: "left arm held down, hand pointing at ground (ang kaliwang braso ay nakapababa, na ang kamay ay nakaturo saibaba)",
  options: [
    "A. passing or overtaking can be made anytime (ang paglampas o ang pag-overtake ay maaaring gawin anumangoras)", 
    "B. it separates traffic moving in opposite directions (hinihiwalay nito ang pagdaloy ng mga sasakyan sa magkabilangdireksiyon)", 
    "C. absolutely no crossing (talagang hindi ipinahihintulot ang pag-cross)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 17,
  question: "What is the meaning of double solid yellow line? (Ano ang kahulugan ng dobleng linyang dilaw?)",
  options: [
    "A. Cross with due care (Tumawid nang maingat)", 
    "B. Cross anytime (Tumawid anumang oras)", 
    "C. Crossing/traversing or overtaking is not allowed (Ang pagtawid o paglusot ay hindi pinahihintulutan) ", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 18,
  question: "Upon approaching an intersection marked with a yield sign, you are required to (Kapag papalapit sa interseksiyong may karatulang nagsasabing magbigay daan (yield), kailangang",
  options: [
    "A. stop before entering the intersection (huminto bago pumasok sa interseksiyon)", 
    "B. slowdown, then enter the intersection when the way is clear (bagalan ang takbo at pagkatapos ay pumasok sa interseksiyon kungligtas)", 
    "C. enter the intersection immediately (pumasok agad sa interseksiyon)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 19,
  question: "The holder of a driver's license shall entitle him/her to operate: (Ang lisensiya ay nagpapahintulot sa drayber na magmaneho ng:)",
  options: [
    "A. any kind of motor vehicle (anumang uri ng sasakyang de-motor)", 
    "B. motor vehicle/s specified in the license only (mga sasakyan lamang na nakatakda sa lisensiya)", 
    "C. motor vehicles for hire only (mga pampublikong sasakyan lamang)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 20,
  question: "When may you lend your driver's license? (Kailan mo maaaring ipahiram ang iyong lisensiya?)",
  options: [
    "A. Under no circumstances (Hindi maaari kahit kailan)", 
    "B. To another person who is learning to drive (Sa indibiduwal na nag-aaral magmaneho)", 
    "C. In emergencies (Sa oras ng kagipitan o emergency)", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 21,
  question: "At an intersection without stop or yield signs, two cars approach at right angles to each other at almost the same time. Which driver mustyield? (Sa interseksiyon na walang mga karatulang nagsasabing huminto o magbigay ng daan, dalawang sasakyan ang sabay na dumating sa anggulong 90 digri sa isa't isa. Sinong drayber ang dapat magbigay daan?)",
  options: [
    "A. The motorist on the right (Ang drayber ng sasakyan sa kanan)", 
    "B. The motorist on the left (Ang drayber ng sasakyan sa kaliwa)", 
    "C. Either of the driver has the first right-of-way (Alinman sa dalawa ay may unang karapatan)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 22,
  question: "Is it allowed to drive a motorcycle in a public road pending release of the Certificate of Registration? (Maaari bang gamitin sa pampublikong daan ang motorsiklo kung ito ay wala pang rehistro?)",
  options: [
    "A. No (Hindi) ", 
    "B. Yes (Oo)", 
    "C. Yes, if travel authority is given by the dealer (Oo, kung ang pagbiyahe ay may pahintulot ang dealer nito) ", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 23,
  question: "Which of the following statement is true? (Alin sa mga sumusunod na pahayag ang totoo?)",
  options: [
    "A. A DL holder with authority to drive vehicles with manual transmission (MT) is not allowed to drive vehicles with automatic transmission (AT) (Ang isang may hawak ng DL na may awtoridad na magmaneho ng manual transmission (MT) ay hindi pinapayagan na magmaneho ng mga sasakyan na automatic transmission (AT)", 
    "B. A DL holder with authority to drive vehicles with automatic transmission (AT) is allowed to drive vehicles with manual transmission (MT) (Ang drayber na may hawak na lisensya para sa atomatik na sasakyan ay pwedeng magmaneho ng sasakyang manwal.)", 
    "C. A DL holder with authority to drive vehicles with manual transmission (MT) is allowed to operate vehicles with automatic transmission (AT) (Ang drayber na may hawak ng lisensya para sa manual transmission ay maaaring magmaneho ng may automatik na transmission", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 24,
  question: "Can you drive a motorcycle if your license bears DL Code B? (Maaari ka bang magmaneho ng motorsiklo kung ang iyong lisensya ay may DL. Code B ?)",
  options: [
    "A. Yes (Oo)", 
    "B. No, unless authorized by a traffic enforcer (Hindi, maliban kung pinahintulutan ng traffic enforcer", 
    "C. No (Hindi)", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 25,
  question: "Identify this traffic sign: (Tukuyin kung anong senyas ito:)",
  options: [
    "A. Identify this traffic sign: (Tukuyin kung anong senyas ito:)", 
    "B. dangerous left bend (mapanganib na kaliwang likuan) ", 
    "C. dangerous right bend (mapanganib na kanang likuan)", 
  ],
  correctAnswer: "A",
  image: RoadSign1,
},
{
  id: 26,
  question: "Identify this traffic sign: (Tukuyin kung anong senyas ito:)",
  options: [
    "A. Identify this traffic sign: (Tukuyin kung anong senyas ito:)", 
    "B. slippery road ahead (madulas ang kalsada sa unahan) ", 
    "C. road narrows ahead (papaliit na kalsada sa unahan)", 
  ],
  correctAnswer: "A",
  image: RoadSign2,
},
{
  id: 27,
  question: "Identify this traffic sign: (Tukuyin kung anong senyas ito:)",
  options: [
    "A. no blowing of horn (bawal bumusina)", 
    "B. animals crossing (may mga hayop na tumatawid) ", 
    "C. dangerous bend (mapanganib na likuan)", 
  ],
  correctAnswer: "A",
  image: RoadSign3,
},
{
  id: 28,
  question: "Identify this traffic sign: (Tukuyin kung anong senyas ito:)",
  options: [
    "A. Road narrows (papaliit ang daan) ", 
    "B. Roundabout (rotunda) ", 
    "C. no entry for all types of vehicle (bawal pumasok ang lahat nguri ng sasakyan", 
  ],
  correctAnswer: "B",
  image: RoadSign4,
},
{
  id: 29,
  question: "Identify this traffic sign: (Tukuyin kung anong senyas ito:)",
  options: [
    "A. slippery road (madulas na kalsada) ", 
    "B. winding road (paikot na daan)", 
    "C. curve ahead (may kurbada sa unahan)", 
  ],
  correctAnswer: "A",
  image: RoadSign5,
},
{
  id: 30,
  question: "What is the meaning of this traffic sign? (Ano ang ibig sabihin ng senyas na ito",
  options: [
    "A. Pedestrian crossing (Tawiran)", 
    "B. Pedestrian crossing ahead (Papalapit na tawiran)", 
    "C. Caution - School Zone (Paalala-paaralan)", 
  ],
  correctAnswer: "B",
  image: RoadSign6,
}
];

// Utility function to get random questions
export const getRandomQuestions = (count = 10) => {
  const shuffledQuestions = [...quizQuestions];
  // Create a copy of the questions array and shuffle it
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }
  
  // Return the first 'count' questions
  return shuffledQuestions.slice(0, count);
};

  