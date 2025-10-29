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
    question: "What should you do when another vehicle is following you too close? (Ano ang gagawin mo kung ang sumusunod na sasakyan sa iyo ay masyadong nakatutok?) ",
    options: [
      "A. Speed up to start a road race (Bilisan pa ang takbo at makipagkarerahan)",
      "B. Slow down gradually and give him the signal to overtake you ((Unti-unti mong bagalan ang takbo at senyasan siyang mag-overtake)", 
      "C. Slam on your brakes (Biglang magpreno)"
    ],
    correctAnswer: "B",
    image: null,
  },
  {
    id: 2,
    question: "Before changing lanes in traffic, aside from giving signal and checking your side and rearview mirrors, what else do you need to do? (Bago lumipat ng lane, bukod sa dapat munang sumenyas, tumingin sa mga gilid at rear view mirror, ano pa ang dapat mong gawin?) ",
    options: [
      "A. Turn your head to check other vehicles beside your car (Tingnan ang mga katabing sasakyan)", 
      "B. Sound your horn (Bumusina)", 
      "C. Blink your headlights (Pailawin ang mga headlights)"
    ],
    correctAnswer: "A",
    image: null,
  },
  {
    id: 3,
    question: "When approaching a sharp curve of the highway, you should: (Kapag papalapit sa isang biglaang pagliko/kurbada, dapat:) ",
    options: [
      "A. reduce speed before entering the curve (bagalan ang takbo bago lumiko)", 
      "B. reduce speed before entering the curve (bagalan ang takbo bago lumiko)", 
      "C. apply your brakes abruptly while taking the curve (biglang magpreno habang lumiliko)", 
    ],
    correctAnswer: "A",
    image: null,
  },
  {
    id: 4,
    question: "Night driving is difficult. We should do the following when a vehicle comes towards us at night: (Mahirap magmaneho kung gabi kaya dapat gawin ang sumusunod kapag may kasalubong na sasakyan:) ",
    options: [
      "A. Night driving is difficult. We should do the following when a vehicle comes towards us at night: (Mahirap magmaneho kung gabi kaya dapat gawin ang sumusunod kapag may kasalubong na sasakyan:) ", 
      "B. brighten your light by switching to high beam (lakasan ang ilaw sa pamamagitan ng pagsindi sa high beam)", 
      "C. switch on your headlights intermittently (sindihan ang mga headlight, on and off)", 
    ],
    correctAnswer: "A",
    image: null,
  },
  {
    id: 5,
    question: "At night, when approaching a curve or intersection with poor visibility, be sure to: (Sa gabi, kapag papalapit sa isang kurbada o interseksiyon na mahirap makita ang kasalubong, siguraduhing:) ",
    options: [
      "A. switch off your headlights to enable oncoming motorists to see you (patayin ang headlight upang makita ng mga motorista ang iyong sasakyan)", 
      "B. flash your headlights to let pedestrians and oncoming motorists know that you are heading into the curve or intersection (sumenyas sa pamamagitan ng pagpatay-sindi ng headlight upang malaman ng mga tao at mga kasalubong na motorista na papalapit ka sa kurbada o interseksiyon)", 
      "C. switch on your interior lights to enable oncoming vehicles to see your vehicle (i-switch ang mga ilaw sa loob ng sasakyan upang makita ng mga makakasalubong ang iyong sasakyan)", 
    ],
    correctAnswer: "B",
    image: null,
  },
  {
      id: 6,
      question: "What is the best safety rule when driving a motor vehicle? (Ano ang pinakaligtas na alituntunin habang ikaw ay nagmamaneho?) ",
      options: [
        "A. Never insist on your right-of-way (Huwag ipilit ang karapatan sa daan)", 
        "B. Never insist on your right-of-way (Huwag ipilit ang karapatan sa daan)", 
        "C. Always demand for the right-of-way (laging igiit ang karapatan sa daan)", 
      ],
      correctAnswer: "A",
      image: null,
  },
  {
      id: 7,
      question: "A blind spot is either at your right or left that you do not see on your side mirror. What should you do before backing-up? (Ang blind spot ay nasa awing kanan o kaliwa na hindi mo nakikita sa iyong side mirror. Ano ang dapat mong gawin bago umatras?) ",
      options: [
        "A. Turn your head to see that the way is clear (Lumingon upang matiyak na walang nakaharang sa daan)", 
        "B. Turn your wheel all the way to the right and pull up (Ipaling nang sagad ang gulong sa kanan bago huminto)", 
        "C. Turn your wheel all the way to the left and pull up (Ipaling nang sagad ang gulong sa kaliwa bago huminto)", 
      ],
      correctAnswer: "A",
      image: null,
  },
  {
      id: 8,
      question: "Road crash can be avoided if the drivers: (Maiiwasan ang mga road crash kung:)",
      options: [
        "A. follow traffic signs and pertinent traffic rules and regulations (susundin ang mga senyas pantrapiko at mga alintuntunin at regulasyon ng batas trapiko) ", 
        "B. totally disobey traffic laws (ganap na hindi susundin ang mga batas trapiko)", 
        "C. are ignorant of traffic laws (ang mga drayber ay walang alam sa batas trapiko) ", 
      ],
      correctAnswer: "A",
      image: null,
  },
  {
      id: 9,
      question: "What should you do whenever you are driving on a highway with a lot of potholes? (Ano ang dapat mong gawin kapag nagmamaneho sa highway na maraming lubak?) ",
      options: [
        "A. Increase speed (Bilisan ang takbo)", 
        "B. Reduce speed (Bagalan ang takbo)", 
        "C. Always change lane (Palaging lumipat ng lane) ", 
      ],
      correctAnswer: "B",
      image: null,
  },
  {
      id: 10,
      question: "Sometimes, a driver passes through a busy street with so many pedestrians. Which of the following should a driver do? (Kung minsan, dumaraan ang drayber sa isang kalye na maraming sasakyan at maraming tao. Alin sa mga sumusunod ang dapat niyang gawin?) ",
      options: [
        "A. Slowdown and check for safety when passing through (Bagalan ang takbo at tingnan kung ligtas ang pagdaan) ", 
        "B. Proceed with usual speed (Magpatuloy sa normal na takbo)", 
        "C. Stop at all cost (Huminto anuman ang mangyari)", 
      ],
      correctAnswer: "A",
      image: null,
  },
  {
    id: 11,
    question: "Driving in heavy rains can be extremely dangerous due to limited visibility. What should you do? (Ang pagmamaneho kapag malakas ang ulan ay lubhang mapanganib dahil hindi makakakita ng maigi. Ano ang dapat mong gawin?) ",
    options: [
      "A. When you cannot see more than 20 meters in front of you, turn on your hazard lights/ headlights and look for a safe place to park (Kapag hindi makakita nang mahigit sa 20 metro sa harapan mo, i- switch ang hazard lights/headlight at maghanap ng ligtas na mapaparadahan) ", 
      "B. Turn on your headlights and slow down or park at a safe place if situation is risky (1- switch ang headlights at bagalan ang takbo o di kaya naman ay huminto sa isang ligtas na lugar kung ang sitwasyon ay mapanganib) ", 
      "C. Turn on your hazard lights, blow your horn and continue driving (I-switch ang hazard lights, bumusina at magpatuloy sa pagmamaneho) ", 
    ],
    correctAnswer: "B",
    image: null,
},
{
  id: 12,
  question: "If you see a ball coming from behind a parked vehicle, it is more likely that a kid is following it. What will you do? (Kung may nakita kang bola na mula sa likuran ng isang nakaparadang sasakyan sa isang kalye, malamang na may batang sumusunod ditto. Ano ang gagawin mo?) ",
  options: [
    "A. Increase your speed (Bilisan ang takbo) ", 
    "B. Slow down (Bagalan ang takbo)", 
    "C. Blow your horn and maintain your speed (Bumusina at panatilihin ang bilis ng takbo)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 13,
  question: 'What should do when you see a traffic sign ACCIDENT PRONE AREA"? (Ano ang dapat mong gawin kung nakakita ka ng senyas trapiko na nagsasabing "ACCIDENT PRONE AREA"?) ',
  options: [
    "A. Slow down and be more alert than usual (Bagalan ang takbo at higit na maging alisto)", 
    "B. Increase your speed (Bilisan ang takbo) ", 
    "C. Blow your horn and resume your normal speed (Bumusina at panatilihin ang normal mong bilis) ", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 14,
  question: "Which of the following is not a safe place to overtake? (Alin sa mga sumusunod ang hindi ligtas na lugar sa pag- overtake/paglusot?) ",
  options: [
    "A. Which of the following is not a safe place to overtake? (Alin sa mga sumusunod ang hindi ligtas na lugar sa pag- overtake/paglusot?) ", 
    "B. At an intersection (Sa interseksyon)", 
    "C. All of the answers (Lahat ng sagot)", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 15,
  question: "Disregarding traffic lights during late hours of the night could: (Ang pagwawalang-bahala sa mga ilaw trapiko kapag gabi na ay)",
  options: [
    "A. Disregarding traffic lights during late hours of the night could: (Ang pagwawalang-bahala sa mga ilaw trapiko kapag gabi na ay)", 
    "B. involve you in a fatal road crash (maaari kang maaksidente at mamatay)", 
    "C. decrease your fuel consumption (makatitipid sa konsumo ng gasolina o krudo) ", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 16,
  question: "A good driver must meet one's social responsibilities of caring for others by: (Ang maayos na drayber ay matutugunan ang responsabilidad sa lipunan sa pamamagitan nang:)",
  options: [
    "A. A good driver must meet one's social responsibilities of caring for others by: (Ang maayos na drayber ay matutugunan ang responsabilidad sa lipunan sa pamamagitan nang:)", 
    "B. exercising care for other pedestrians and vehicles around (laging pagsasaalang-alang sa mga tumatawid sa kalsada at sa mga sasakyang nakapaligid) ", 
    "C. blowing one's horn every now and then to scare passers-by (maya't mayang pagbusina upang takutin ang mga naglalakad)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 17,
  question: "When the vehicle you are driving runs off the road or hits an electric post or a parked car, the most probable reason is: (Kapag ang minamaneho mong sasakyan ay lumihis sa kalsada o tumama sa poste ng kuryente o nakaparadang sasakyan, malamang na ang dahilan nito ay:)",
  options: [
    "A. you are driving too fast and you lost control of your vehicle (mabilis ang iyong pagpapatakbo at nawalan ka ng kontrol sa iyong sasakyan)", 
    "B. you lost brake (nawalan ka ng preno)", 
    "C. you are trying to overtake (mag-o-overtake ka sana)", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 18,
  question: "If your vehicle broke down on the road, what should you do? (Kapag nasiraan ka ng sasakyan sa daan, ano ang gagawin mo?) ",
  options: [
    "A. Leave the vehicle and call for a mechanic (Iwan ang sasakyan at tumawag ka ng mekaniko) ", 
    "B. Switch on the hazard warning lights and display an Early Warning Device (EWD) at least four (4) meters behind the stalled vehicle (Pailawin ang hazard warning light at maglagay ng EWD apat (4) na metro man lamang sa likuran ng nakahintong sasakyan)  ", 
    "C. Turn off the engine and call for a mechanic (Patayin ang makina at tumawag ng mekaniko) ", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 19,
  question: "What is the primary responsibility of a driver in times of a road crash? (Ano ang pangunahing responsibilidad ng isang drayber sa isang aksidente?) ",
  options: [
    "A. Aid the victim (Tulungan ang naaksidente)", 
    "B. Run and hide (Tumakbo at magtago)", 
    "C. Ask for victim's identification card (Tanungin ang mga biktima nang pagkakakilanlan)", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 20,
  question: "Which of the following is a quality of a defensive driver? (Alin sa mga sumusunod ang kwalipikasyon ng isang maayos na drayber?) ",
  options: [
    "A. drivers who knows how to properly use clutch and brake pedals while driving (mga drayber na marunong gumamit ng clutch at preno habang nagmamaneho)", 
    "B. drivers that are using the basic knowledge of vehicle maintenance (Mga drayber na may kaalaman sa pagmintina ng sasakyan)", 
    "C. driver who continues to drive even with flat tires to avoid an impounding ticket (Mga drayber na nagpapatuloy sa pagbiyahe kahit na flat ang gulong para maiwasang ma- impound)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 21,
  question: "Which one is correct road discipline? (Alin ang tamang disiplina sa kalsada?)",
  options: [
    "A. hiding from traffic enforcers during oplan sita (magtago sa mga enforcers sa panahon ng oplan sita) ", 
    "B. following the advise of the elderly (Sundin ang mga payo ng mga matatanda) ", 
    "C. knowing and abiding by the traffic rules and regulations (Alamin at sundin ang mga batas trapiko)", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 22,
  question: "How can you overcome stress? (Paano mo malalampasan ang stress o tensyon?)",
  options: [
    "A. stopping, getting out of the vehicle, shouting at anybody who inquires and then engaging in a fight (paghinto, pagbaba sa sasakyan, pagsigaw kahit kanino at maghamon ng away sa mga nagtatanong)", 
    "B. taking a deep breath, sitting comfortably, listening to soothing music, allowing enough space in front and providing extra travel time (Huminga ng malalim, maupo ng maayos,", 
    "C. driving faster than allowed, listen to loud music, shouting at passengers and provoke other motorists to a fight (Pagmaneho nang mas mabilis, pagkinig sa maiingay na tugtog, pagsigaw sa mga iba pang motorista at paghamon ng away)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 23,
  question: "What may happen if a driver failed to overcome stress? (Ano ang maaaring mangyari kung ang isang drayber ay hindi malampasan ang stress o tensyon?) ",
  options: [
    "A. proper changing lanes (tamang paglipat ng lane o pwesto) ", 
    "B. smooth braking (Maayos na pagpreno)", 
    "C. road rage (Away sa kalsada)", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 24,
  question: "Which of the following actions may result to road rage? (Alin sa mga sumusunod ang maaaring mag resulta sa away kalsada?) ",
  options: [
    "A. following a vehicle with enough space to maneuver (pagsunod sa isang sasakyan ng may tamang agwat)", 
    "B. cutting off other vehicles or following too close (Pag-cut sa ibang motorista at pagtutok sa mga ito)", 
    "C. allowing other motorists to overtake with ease (Pagbigay daan sa mga motorista para makapag-overtake nang maayos)", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 25,
  question: "What is the ultimate result of a road rage? (Ano ang pinakamasamang mangyayari sa isang away kalsada?)",
  options: [
    "A. Death (kamatayan) ", 
    "B. more friends (Mas maraming kaibigan) ", 
    "C. Refreshment", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 26,
  question: "If you feel drowsy while driving, it is important that you: (Kung nakakaramdam ka ng pagka- antok habang nagmamaneho, mahalaga na ikaw ay:)",
  options: [
    "A. park at a safe place, and take a short break before proceeding (magparada sa ligtas na lugar at magpahinga bago magpatuloy)", 
    "B. speed up to reach your destination faster (bilisan ang takbo upang makarating ng mabilis sa destinasyon)  ", 
    "C. stop driving, switch on the hazard lights and take a nap (huminto sa pagmamaneho, iswitch ang mga hazard lights at magpahinga) ", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 27,
  question: "Can a driver allow a cyclist to hitch on his vehicle? (Maaari bang pahintulutan ng drayber ang siklista na sumabit sa kanyang sasakyan?",
  options: [
    "A. No, especially without permission from an enforcer (Hindi, lalo at walang permiso sa traffic enforcer)", 
    "B. No, road crash may happen (Hindi, maaaring magka-aksidente) ", 
    "C. No (Hindi)", 
  ],
  correctAnswer: "C",
  image: null,
},
{
  id: 28,
  question: "What is the first thing to do if you experience a tire blowout? (Ano ang una mong dapat gawin kung ikaw ay nakaranas ng tire blowout?) ",
  options: [
    "A. Don't step on the brakes, focus on the steering wheel (huwag tapakan ang preno, at magpokus sa manibela)", 
    "B. Step on your brakes immediately to avoid hitting the motor vehicle in front of you (agad na tapakan ang brakes upang maiwasan ang pagbangga sa mga sasakyan na nasa iyong harapan)", 
    "C. Switch off the engine (patayin ang makina)", 
  ],
  correctAnswer: "A",
  image: null,
},
{
  id: 29,
  question: "What is the main purpose of having a vehicle undergo regular vehicle maintenance inspection? (Ano ang pangunahing layunin ng regular na pag inspeksyon ng isang sasakyan?) ",
  options: [
    "A. to verify the chassis and engine numbers of the vehicle (Para siyasatin ang mga numero ng chassis at motor ng sasakyan) ", 
    "B. to check the roadworthiness of the vehicle (Para tingnan ang kaayusan ng sasakyan)", 
    "C. to check the driver's performance (Para tingnan ang pagganap ng drayber sa kanyang pagmamaneho) ", 
  ],
  correctAnswer: "B",
  image: null,
},
{
  id: 30,
  question: "When do you need to follow the traffic rules and regulations? (Kailan mo dapat sundin ang mga batas trapiko?)	",
  options: [
    "A. When do you need to follow the traffic rules and regulations? (Kailan mo dapat sundin ang mga batas trapiko?)	", 
    "B. when parked (Habang nagpaparada)", 
    "C. while at the steering wheel (Habang nasa manibela)", 
  ],
  correctAnswer: "c",
  image: null,
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

  