import { Destination, Attraction } from '@/types';

export const COMPREHENSIVE_DESTINATIONS: Destination[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi / NCR',
    shortDescription: 'India’s historic capital blending imperial Mughal architecture with wide neoclassical avenues.',
    detailedDescription: 'Delhi bridges ancient and modern India: the 17th-century walled city of Shahjahanabad with its red sandstone fortresses, and New Delhi designed with stately government boulevards and landscaped gardens.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/India_Gate_front.jpg/1280px-India_Gate_front.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    shortDescription: 'City of the immortal Taj Mahal, Agra Fort, and sublime Mughal royal gardens along the Yamuna.',
    detailedDescription: 'The former seat of the Mughal Empire at its zenith, renowned for white marble inlay pietra dura craftsmanship, imperial fortresses, and romantic riverside pavilions.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'fatehpur-sikri',
    name: 'Fatehpur Sikri',
    state: 'Uttar Pradesh',
    shortDescription: 'Emperor Akbar’s magnificent red sandstone ghost capital and the towering Buland Darwaza.',
    detailedDescription: 'Founded in 1571 by Emperor Akbar, this UNESCO World Heritage city features palatial courtyards, the white marble tomb of Sufi saint Salim Chishti, and the world’s highest ceremonial gateway.',
    recommendedDuration: 'Half Day / En Route',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/1280px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg',
    gallery: []
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    shortDescription: 'The royal Pink City of palaces, hilltop fortresses, and colorful artisan bazaars.',
    detailedDescription: 'Capital of Rajasthan founded in 1727 by Maharaja Sawai Jai Singh II. Famous for Amber Fort, Hawa Mahal, City Palace, astronomical Jantar Mantar, and vibrant textile handicrafts.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'mathura-vrindavan',
    name: 'Mathura & Vrindavan',
    state: 'Uttar Pradesh',
    shortDescription: 'Sacred birthplace of Lord Krishna along the Yamuna with centuries of bhakti devotion and illuminated temples.',
    detailedDescription: 'One of Hinduism’s holiest twin pilgrimage towns, featuring Krishna Janmabhoomi, the ornate Italian marble Prem Mandir, and Banke Bihari Temple.',
    recommendedDuration: '1 Day',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/PremMandirSideViewFromCanteen.jpg/1280px-PremMandirSideViewFromCanteen.jpg',
    gallery: []
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    state: 'Rajasthan',
    shortDescription: 'The majestic Blue City crowned by the towering cliffside ramparts of Mehrangarh Fort.',
    detailedDescription: 'Known for indigo-hued houses, the sprawling Mehrangarh Fort museum, cenotaphs of Jaswant Thada, and royal art deco Umaid Bhawan Palace.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mehrangarh_Fort_sanhita.jpg/1280px-Mehrangarh_Fort_sanhita.jpg',
    gallery: []
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    shortDescription: 'The Venice of the East, famed for shimmering Lake Pichola and white marble island palaces.',
    detailedDescription: 'Set against the ancient Aravalli Hills, Udaipur offers spectacular palaces, tranquil sunset boat cruises, and royal Mewar heritage.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Udaipur_City_Palace.jpg/1280px-Udaipur_City_Palace.jpg',
    gallery: []
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    state: 'Rajasthan',
    shortDescription: 'The Golden City rising out of the Thar Desert with its living fort and rolling sand dunes.',
    detailedDescription: 'Famous for Sonar Qila, carved sandstone havelis, desert camps under starlit skies, and camel safaris across the Sam sand dunes.',
    recommendedDuration: '2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/1280px-Jaisalmer_forteresse.jpg',
    gallery: []
  },
  {
    id: 'pushkar',
    name: 'Pushkar',
    state: 'Rajasthan',
    shortDescription: 'Spiritual oasis centered around the holy Pushkar Lake and the rare 14th-century Lord Brahma Temple.',
    detailedDescription: 'A pilgrimage destination nestled around a sacred lake with 52 bathing ghats, rose flower plantations, vibrant bazaars, and scenic desert hills.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Evening_lights_by_the_Pushkar_Lake%2C_Pushkar.jpg/1280px-Evening_lights_by_the_Pushkar_Lake%2C_Pushkar.jpg',
    gallery: []
  },
  {
    id: 'ranthambore',
    name: 'Ranthambore',
    state: 'Rajasthan',
    shortDescription: 'World-famous Royal Bengal Tiger sanctuary with 10th-century jungle fortress ruins.',
    detailedDescription: 'One of Northern India’s largest national parks, offering thrilling open-top 4x4 Gypsy safaris to spot wild Bengal tigers, leopards, crocodiles, and exotic birds.',
    recommendedDuration: '2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ranthambore_National_Park.JPG/1280px-Ranthambore_National_Park.JPG',
    gallery: []
  },
  {
    id: 'bikaner',
    name: 'Bikaner',
    state: 'Rajasthan',
    shortDescription: 'Desert fortress city celebrated for Junagarh Fort, camel breeding, and heritage havelis.',
    detailedDescription: 'An imposing desert settlement with an undefeated red sandstone fort, the historic Karni Mata temple, and savory Rajasthani delicacies.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/India_Bikaner_Junagarh_Fort.jpg/1280px-India_Bikaner_Junagarh_Fort.jpg',
    gallery: []
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    shortDescription: 'Spiritual capital of India on the sacred Ganges with mystical evening aarti ceremonies.',
    detailedDescription: 'One of the world’s oldest continuously inhabited cities, celebrated for Dashashwamedh Ghat aarti, sunrise boat rides, Kashi Vishwanath temple, and silk weaving.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/1280px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg',
    gallery: []
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    shortDescription: 'Spiritual heart of Sikhism with the resplendent Golden Temple and patriotic Wagah Border ceremony.',
    detailedDescription: 'Home to Sri Harmandir Sahib, communal langar dining serving tens of thousands daily, Jallianwala Bagh, and vibrant Punjabi culture.',
    recommendedDuration: '2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg',
    gallery: []
  },
  {
    id: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    shortDescription: 'The Queen of Hills, former summer capital of British India surrounded by pine and cedar forests.',
    detailedDescription: 'Charming colonial pedestrian avenues on the Ridge and Mall Road, panoramic Himalayan vistas, Jakhoo Hill, and the toy train railway.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/1280px-The_Ridge_Shimla_5.jpg',
    gallery: []
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    shortDescription: 'Alpine adventure haven along the Beas River, gateway to Solang Valley, Rohtang Pass, and Atal Tunnel.',
    detailedDescription: 'Famous for snow sports, pine forests, apple orchards, river rafting, ancient Hadimba Temple, and high-altitude mountain passes.',
    recommendedDuration: '3–4 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kullu_Valley_from_Rohtang_Pass%2C_India.jpg/1280px-Kullu_Valley_from_Rohtang_Pass%2C_India.jpg',
    gallery: []
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala',
    state: 'Himachal Pradesh',
    shortDescription: 'Gateway to the Kangra Valley, home to the Dalai Lama and scenic Dhauladhar pine hills.',
    detailedDescription: 'Center of Tibetan culture with peaceful monasteries, meditation retreats, mountain hiking trails, and the picturesque HPCA cricket stadium.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Dharamshala_stadium%2Chimachal_pradesh.jpg/1280px-Dharamshala_stadium%2Chimachal_pradesh.jpg',
    gallery: []
  },
  {
    id: 'srinagar',
    name: 'Srinagar',
    state: 'Jammu & Kashmir',
    shortDescription: 'Paradise on Earth with luxury Dal Lake houseboats, terraced Mughal gardens, and snow-capped peaks.',
    detailedDescription: 'Experience serene wooden Shikara cruises, floating vegetable markets, century-old Mughal pleasure gardens, and exquisite Kashmiri pashmina handicrafts.',
    recommendedDuration: '3–4 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg',
    gallery: []
  },
  {
    id: 'gulmarg',
    name: 'Gulmarg',
    state: 'Jammu & Kashmir',
    shortDescription: 'Meadow of Flowers featuring the world’s highest operating cable car and premier snow ski slopes.',
    detailedDescription: 'High-altitude mountain resort renowned for the two-phase Gulmarg Gondola riding up to 14,000 feet atop Apharwat Peak, pine-covered meadows, and alpine skiing.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Gulmarg_gondola.JPG/1280px-Gulmarg_gondola.JPG',
    gallery: []
  },
  {
    id: 'pahalgam',
    name: 'Pahalgam',
    state: 'Jammu & Kashmir',
    shortDescription: 'Valley of Shepherds with gushing Lidder River, pine forests, and scenic Betaab and Aru valleys.',
    detailedDescription: 'Pristine mountain valley celebrated for trout fishing, pony treks to Baisaran Meadow (Mini Switzerland), and scenic alpine meadows.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Betaab_Valley.jpg/1280px-Betaab_Valley.jpg',
    gallery: []
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    shortDescription: 'Yoga capital of the world on the emerald banks of the holy Ganges at the Himalayan foothills.',
    detailedDescription: 'World-renowned destination for spiritual yoga ashrams, suspension footbridges, evening Ganga Aarti at Triveni Ghat, and white-water river rafting.',
    recommendedDuration: '2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Triveni_Ghat_Krishna_Arjun_Rath.jpg/1280px-Triveni_Ghat_Krishna_Arjun_Rath.jpg',
    gallery: []
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    state: 'Uttarakhand',
    shortDescription: 'Ancient holy gateway where the sacred River Ganges emerges from the Himalayas onto the Indo-Gangetic plains.',
    detailedDescription: 'Famous for the spectacular evening Maha Aarti at Har Ki Pauri where thousands of illuminated leaf diyas float down the swift Ganges currents.',
    recommendedDuration: '1 Day',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Evening_view_of_Har-ki-Pauri%2C_Haridwar.jpg/1280px-Evening_view_of_Har-ki-Pauri%2C_Haridwar.jpg',
    gallery: []
  },
  {
    id: 'bharatpur',
    name: 'Bharatpur',
    state: 'Rajasthan',
    shortDescription: 'UNESCO-listed Keoladeo Ghana National Park wetland sanctuary and bird paradise.',
    detailedDescription: 'World-renowned wetlands sanctuary hosting over 370 species of resident and migratory waterbirds, best explored by quiet cycle rickshaw with certified naturalists.',
    recommendedDuration: '1 Day',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Painted_stork_Keoladeo.jpg/1280px-Painted_stork_Keoladeo.jpg',
    gallery: []
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    shortDescription: 'The vibrant City of Dreams, financial hub of India featuring colonial Victorian Gothic heritage and Marine Drive.',
    detailedDescription: 'From the Gateway of India to the grand Chhatrapati Shivaji Maharaj Terminus, Bollywood studios, and sunset strolls along the Arabian Sea.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg',
    gallery: []
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    shortDescription: 'Sun-drenched coastal haven of golden beaches, Portuguese heritage churches, and tropical susegad lifestyle.',
    detailedDescription: 'Featuring UNESCO-listed Old Goa cathedrals, seaside forts, thrilling water sports, and tranquil coconut palm-fringed backwaters.',
    recommendedDuration: '3–4 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg',
    gallery: []
  },
  {
    id: 'kerala',
    name: 'Kerala (Munnar & Alleppey)',
    state: 'Kerala',
    shortDescription: 'God’s Own Country with misty Munnar tea plantations and serene Alleppey backwater houseboats.',
    detailedDescription: 'Experience rolling emerald tea estates, spice gardens, Ayurvedic rejuvenation, and leisurely overnight cruises aboard traditional thatched Kettuvallam houseboats.',
    recommendedDuration: '3–5 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/1280px-Alappuzha_Boat_Beauty_W.jpg',
    gallery: []
  },
  {
    id: 'dalhousie',
    name: 'Dalhousie',
    state: 'Himachal Pradesh',
    shortDescription: 'Quaint colonial hill station perched on five hills with pine-scented trails and Khajjiar meadow.',
    detailedDescription: 'Colonial-era architecture, serene mountain walks, Dainkund Peak, and the famous saucer-shaped green meadow of Khajjiar known as Mini Switzerland.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Khajjiar.jpg/1280px-Khajjiar.jpg',
    gallery: []
  },
  {
    id: 'mcleodganj',
    name: 'McLeodGanj',
    state: 'Himachal Pradesh',
    shortDescription: 'Little Lhasa of India and residence of the Dalai Lama surrounded by majestic cedar forests.',
    detailedDescription: 'High-altitude Tibetan refuge featuring the Tsuglagkhang Temple complex, Buddhist monasteries, Bhagsunag waterfall, and vibrant cafes overlooking the Kangra valley.',
    recommendedDuration: '2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Namgyal_Monastery_India_Himachal_Pradesh_Mc_Leod_Ganj.jpg/1280px-Namgyal_Monastery_India_Himachal_Pradesh_Mc_Leod_Ganj.jpg',
    gallery: []
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    shortDescription: 'Sacred birthplace of Lord Rama along the holy Saryu River celebrating millennia of devotion.',
    detailedDescription: 'Spiritual epic center of the Ramayana featuring the magnificent Shree Ram Janmabhumi Temple, hilltop Hanuman Garhi fortress, and evening Saryu Maha Aarti at Ram Ki Paidi.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/1280px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg',
    gallery: []
  },
  {
    id: 'gaya',
    name: 'Gaya',
    state: 'Bihar',
    shortDescription: 'Ancient holy city on the Falgu River renowned for ancestral Pind Daan and sacred shrines.',
    detailedDescription: 'Deeply revered Hindu pilgrimage center featuring the historic Vishnupad Temple housing Lord Vishnu’s footprint and Mangla Gauri Shakti Peetha.',
    recommendedDuration: '1 Day',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Vishnupad_Temple%2CUpdated.jpg/1280px-Vishnupad_Temple%2CUpdated.jpg',
    gallery: []
  },
  {
    id: 'bodh-gaya',
    name: 'Bodh Gaya',
    state: 'Bihar',
    shortDescription: 'The cradle of Buddhism where Gautama Buddha attained enlightenment beneath the Bodhi Tree.',
    detailedDescription: 'UNESCO World Heritage Mahabodhi Temple, the sacred Bodhi Tree, international Buddhist monasteries, and the serene 80-foot Great Buddha Statue.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/1280px-Mahabodhitemple.jpg',
    gallery: []
  },
  {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    state: 'Uttar Pradesh',
    shortDescription: 'Sacred forest retreat where Lord Rama, Sita, and Lakshmana spent eleven years in exile.',
    detailedDescription: 'Tranquil pilgrimage town on the Mandakini River featuring holy Ramghat where Tulsidas composed the Ramcharitmanas and the sacred circumambulation hill of Kamadgiri.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Govinda_ghat_at_Chitrakoot.jpg/1280px-Govinda_ghat_at_Chitrakoot.jpg',
    gallery: []
  },
  {
    id: 'prayagraj',
    name: 'Prayagraj',
    state: 'Uttar Pradesh',
    shortDescription: 'Holy confluence of the Ganga, Yamuna, and Saraswati rivers, host to the sacred Kumbh Mela.',
    detailedDescription: 'World-famous Triveni Sangam for holy dips, the historic subterranean Bade Hanuman Ji Mandir, Anand Bhavan, and rich colonial-era cultural heritage.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/NorthIndiaCircuit_250.jpg/1280px-NorthIndiaCircuit_250.jpg',
    gallery: []
  },
];

export const COMPREHENSIVE_ATTRACTIONS: Attraction[] = [
  // ==========================================
  // DELHI
  // ==========================================
  {
    id: 'delhi-qutub',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Qutub Minar Complex',
    shortDescription: 'UNESCO-listed 72.5-meter fluted red sandstone minaret and 4th-century rust-proof Iron Pillar.',
    detailedDescription: 'Built in 1192 AD by Qutb-ud-din Aibak, the complex showcases Indo-Islamic architecture, Quranic calligraphy, and the ancient Iron Pillar of Chandragupta II.',
    duration: '1.5–2 Hours',
    category: 'Monument & Heritage',
    unesco: true,
    image: 'https://plus.unsplash.com/premium_photo-1697729438410-d53c666e3810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'delhi-humayun',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Humayun’s Tomb',
    shortDescription: 'Sublime 16th-century Mughal garden tomb that inspired the design of the Taj Mahal.',
    detailedDescription: 'UNESCO World Heritage monument surrounded by formal Persian-style Charbagh water gardens, featuring red sandstone walls inlaid with delicate white marble.',
    duration: '1.5 Hours',
    category: 'Mughal Monument',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1609670289875-590e8ec05c88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYXl1biVFMiU4MCU5OXMlMjB0b21ifGVufDB8fDB8fHww'
  },
  {
    id: 'delhi-india-gate',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'India Gate & Kartavya Path',
    shortDescription: 'Iconic 42-meter triumphal war memorial arch and grand ceremonial boulevard.',
    detailedDescription: 'Designed by Sir Edwin Lutyens honoring Indian soldiers of World War I. Beautifully illuminated in the evening with landscaped lawns and fountains.',
    duration: '45 Minutes',
    category: 'National Memorial',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW5kaWElMjBnYXRlfGVufDB8fDB8fHww'
  },
  {
    id: 'delhi-red-fort',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Red Fort (Lal Qila)',
    shortDescription: 'Imposing octagonal red sandstone fortress of Shah Jahan and historic seat of Mughal power.',
    detailedDescription: 'UNESCO World Heritage citadel encompassing Diwan-i-Aam, Diwan-i-Khas, Moti Masjid, and royal bath pavilions along the Yamuna bank.',
    duration: '2 Hours',
    category: 'Historic Fortress',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1705524220939-dac17cf94236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVkJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'delhi-lotus',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Lotus Temple (Baháʼí House of Worship)',
    shortDescription: 'World-famous lotus flower-shaped marble temple welcoming people of all faiths for silent meditation.',
    detailedDescription: 'Engineered with 27 free-standing white marble petals surrounded by nine tranquil ponds. A serene sanctuary of universal peace.',
    duration: '1 Hour',
    category: 'Architectural Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1688257899811-d96d969416bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TG90dXMlMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'delhi-akshardham',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Swaminarayan Akshardham Temple',
    shortDescription: 'Colossal intricately carved pink sandstone and Italian Carrara marble temple with musical water fountain.',
    detailedDescription: 'Showcases millennia of traditional Indian art, culture, and spirituality through intricate stone carvings of deities, dancers, and flora.',
    duration: '2.5 Hours',
    category: 'Spiritual Complex',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1789606565427-ce5b3749bf6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN3YW1pbmFyYXlhbiUyMEFrc2hhcmRoYW0lMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'delhi-chandni-chowk',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Chandni Chowk & Old Delhi Rickshaw Tour',
    shortDescription: 'Atmospheric rickshaw safari through 350-year-old spice markets, silver bazaars, and street food lanes.',
    detailedDescription: 'Experience the kinetic energy of Old Delhi, visiting Khari Baoli (Asia’s largest spice market), Kinari Bazaar, and sampling traditional parathas and jalebis.',
    duration: '2 Hours',
    category: 'Cultural Activity',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1662103086938-f57fbb0689a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmRuaSUyMGNob3drfGVufDB8fDB8fHww'
  },
  {
    id: 'delhi-jama-masjid',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Jama Masjid',
    shortDescription: 'India’s largest historic Mughal mosque commissioned by Shah Jahan in 1656.',
    detailedDescription: 'Marvel at the sweeping courtyard accommodating 25,000 worshippers, towering minarets, and pay respects at Mahatma Gandhi’s black marble memorial at Raj Ghat.',
    duration: '1.5 Hours',
    category: 'Historic Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1637301625903-e25a30ba1bb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFtYSUyME1hc2ppZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'delhi-raj-ghat',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Raj Ghat (Mahatma Gandhi Memorial)',
    shortDescription: 'Peaceful black marble memorial cenotaph and eternal flame honoring Mahatma Gandhi.',
    detailedDescription: 'Surrounded by tranquil landscaped lawns on the banks of the Yamuna River, marking the sacred spot of Mahatma Gandhi’s cremation on January 31, 1948. Features an eternal flame and his immortal last words “He Ram”.',
    duration: '1 Hour',
    category: 'National Memorial & Gardens',
    unesco: false,
    image: 'https://media.istockphoto.com/id/2259603090/photo/raj-ghat-mahatma-gandhi-memorial-in-delhi.webp?a=1&b=1&s=612x612&w=0&k=20&c=AQCqIo-KQAZH-dIOmLMfBMzuLbnQc-vPryEuq-2zm5A='
  },

  // ==========================================
  // AGRA
  // ==========================================
  {
    id: 'agra-taj-mahal',
    destinationId: 'agra',
    destinationName: 'Agra',
    name: 'Taj Mahal (Sunrise / Daytime Tour)',
    shortDescription: 'Pinnacle of Mughal architecture and UNESCO World Wonder in pure white Makrana marble.',
    detailedDescription: 'Commissioned in 1632 by Emperor Shah Jahan in memory of his beloved empress Mumtaz Mahal. Celebrated for luminous marble domes, floral pietra dura inlays, and reflective pools.',
    duration: '2.5–3 Hours',
    category: 'World Wonder & Monument',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'agra-fort',
    destinationId: 'agra',
    destinationName: 'Agra',
    name: 'Agra Fort (Lal Qila of Agra)',
    shortDescription: 'Grand 16th-century imperial red sandstone and marble fortress overlooking the Yamuna River.',
    detailedDescription: 'The primary residence of the Mughal emperors until 1638. Encloses Jahangiri Mahal, Khas Mahal, the mirror-inlaid Sheesh Mahal, and the balcony where Shah Jahan was imprisoned.',
    duration: '2 Hours',
    category: 'Imperial Fortress',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWdyYSUyMEZPcnR8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'agra-mehtab-bagh',
    destinationId: 'agra',
    destinationName: 'Agra',
    name: 'Mehtab Bagh (Moonlight Garden Sunset Taj View)',
    shortDescription: 'Charbagh garden complex across the Yamuna River offering iconic crowd-free sunset views of the Taj.',
    detailedDescription: 'Aligned symmetrically with the Taj Mahal across the river, this garden provides a tranquil vantage point to witness the marble monument glow golden at dusk.',
    duration: '1 Hour',
    category: 'Royal Garden & Sunset View',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1524491887412-14c265900364?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'agra-itmad-ud-daulah',
    destinationId: 'agra',
    destinationName: 'Agra',
    name: 'Tomb of I’timād-ud-Daulah (Baby Taj)',
    shortDescription: 'Intricate marble jewel-box mausoleum preceding the Taj Mahal in delicate floral inlay craftsmanship.',
    detailedDescription: 'Built by Empress Nur Jahan for her father between 1622 and 1628. Marked the historic architectural transition from red sandstone to white marble.',
    duration: '1 Hour',
    category: 'Mughal Mausoleum',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomb_of_Itmad-ud-Daulah.jpg/1280px-Tomb_of_Itmad-ud-Daulah.jpg'
  },
  {
    id: 'agra-sikandra',
    destinationId: 'agra',
    destinationName: 'Agra',
    name: 'Akbar’s Tomb at Sikandra',
    shortDescription: 'Grand multi-tiered red sandstone and white marble mausoleum of Emperor Akbar surrounded by deer gardens.',
    detailedDescription: 'A unique architectural hybrid of Hindu, Islamic, Buddhist, and Jain styles featuring four minarets and expansive peaceful gardens.',
    duration: '1 Hour',
    category: 'Historic Monument',
    unesco: false,
    image: 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'agra-akbar-church',
    destinationId: 'agra',
    destinationName: 'Agra',
    name: 'Akbar’s Church',
    shortDescription: 'Historic Roman Catholic Church built in 1600 by Jesuit Fathers under Emperor Akbar.',
    detailedDescription: 'Akbar\'s Church also known as Church of Akbar is a Roman Catholic Church, built in 1600 by Jesuit Fathers, situated in Agra, India. It was the first Roman Catholic Church constructed in the Mughal capital.',
    duration: '1 Hour',
    category: 'Historic Roman Catholic Church',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Agra%2C_Akbar%27s_church.JPG'
  },

  // ==========================================
  // FATEHPUR SIKRI
  // ==========================================
  {
    id: 'fs-buland-darwaza',
    destinationId: 'fatehpur-sikri',
    destinationName: 'Fatehpur Sikri',
    name: 'Buland Darwaza & Sheikh Salim Chishti Shrine',
    shortDescription: 'The 54-meter high Gate of Magnificence and the white marble Sufi shrine of Sheikh Salim Chishti.',
    detailedDescription: 'Built in 1601 by Akbar to commemorate his victory over Gujarat. Features a soaring arched portal, Persian calligraphy, and the sacred tomb with pierced marble lattice jali screens.',
    duration: '1.5 Hours',
    category: 'UNESCO Monumental Gate',
    unesco: true,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw'
  },
  {
    id: 'fs-palace-complex',
    destinationId: 'fatehpur-sikri',
    destinationName: 'Fatehpur Sikri',
    name: 'Fatehpur Sikri Royal Palaces & Panch Mahal',
    shortDescription: 'Akbar’s five-story tiered pillared pavilion, Diwan-i-Khas central carved pillar, and Anup Talao pool.',
    detailedDescription: 'A marvel of secular Mughal palace architecture where Akbar engaged with scholars of all faiths around the iconic central carved lotus pillar of the Hall of Private Audience.',
    duration: '1.5 Hours',
    category: 'Historic Palace Complex',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Panch_Mahal_and_its_gardens.jpg/1280px-Panch_Mahal_and_its_gardens.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'fs-panch-mahal',
    destinationId: 'fatehpur-sikri',
    destinationName: 'Fatehpur Sikri',
    name: 'Panch Mahal (Wind Catcher Tower)',
    shortDescription: 'Five-story extraordinary pyramidal pavilion supported by 176 intricately carved columns.',
    detailedDescription: 'An extraordinary open-air pleasure pavilion built by Emperor Akbar for relaxation and court entertainment, tapering from 84 pillars on the ground level to a single domed chhatri on the top tier.',
    duration: '1 Hour',
    category: 'Mughal Royal Pavilion',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1742303300027-a4c32eafe389?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'fs-jodha-bai-palace',
    destinationId: 'fatehpur-sikri',
    destinationName: 'Fatehpur Sikri',
    name: 'Jodha Bai’s Palace (Mariam-uz-Zamani Palace)',
    shortDescription: 'Largest and most ornate zenana palace blending Gujarati Hindu carvings and Mughal grandeur.',
    detailedDescription: 'The principal royal harem complex featuring ornate peacocks, lotus motifs, private courtyards, and a Hindu temple niche crafted for Akbar’s Rajput queen.',
    duration: '1 Hour',
    category: 'Mughal Zenana Palace',
    unesco: true,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw'
  },
  {
    id: 'fs-diwan-i-khas',
    destinationId: 'fatehpur-sikri',
    destinationName: 'Fatehpur Sikri',
    name: 'Diwan-i-Khas (Hall of Private Audience)',
    shortDescription: 'Akbar’s private audience hall featuring the famous central carved stone pillar and walkway.',
    detailedDescription: 'Renowned for its ingenious octagonal central pillar intricately carved with 36 serpentine brackets supporting Akbar’s throne platform, connected by stone bridges to four viewing balconies.',
    duration: '45 Minutes',
    category: 'Royal Audience Hall',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Diwan-i-khas%2C_Red_fort.jpg/500px-Diwan-i-khas%2C_Red_fort.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail'
  },

  // ==========================================
  // JAIPUR
  // ==========================================
  {
    id: 'jaipur-amber-fort',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Amber Fort & Palace (Amer Fort)',
    shortDescription: 'Majestic hilltop Rajput fortress with mirror-studded Sheesh Mahal overlooking Maota Lake.',
    detailedDescription: 'A UNESCO World Heritage hill fort built by Raja Man Singh I. Features multi-tiered courtyards, marble corridors, Diwan-i-Aam, and the world-renowned Palace of Mirrors.',
    duration: '2.5 Hours',
    category: 'Hill Fortress & Palace',
    unesco: true,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SPfXHdnTWBP2oV0EiqBGvNHxAX1igMpefVhT90f0lRqcFmGdsDWcFmQQbi8hWXGb3Hfpg9pdR3QW-uJuNUsxMI5leYlVIk2NNSn4a-XspAu95qMFK2gLMtT1Kef5wU274R6eLOig=s1360-w1360-h1020-rw'
  },
  {
    id: 'jaipur-hawa-mahal',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Hawa Mahal (Palace of Winds)',
    shortDescription: 'Iconic 5-story pink honeycomb facade featuring 953 delicately carved jharokha lattice windows.',
    detailedDescription: 'Constructed in 1799 by Maharaja Sawai Pratap Singh so royal women could observe festive street processions without being seen from outside.',
    duration: '45 Minutes',
    category: 'Palace Facade & Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGF3YSUyME1haGFsfGVufDB8fDB8fHww'
  },
  {
    id: 'jaipur-city-palace',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'City Palace, Jaipur',
    shortDescription: 'Living royal residence of the Maharaja of Jaipur featuring the ornate Peacock Gate courtyards.',
    detailedDescription: 'A blend of Rajasthani and Mughal court architecture, housing the Maharaja Sawai Man Singh II Museum, silver urns (Gangajalis), and royal weapon galleries.',
    duration: '2 Hours',
    category: 'Royal Palace Complex',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1667099639128-4b10f464f4a2?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'jaipur-jantar-mantar',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Jantar Mantar Astronomical Observatory',
    shortDescription: '18th-century UNESCO stone observatory housing the world’s largest stone sundial (Samrat Yantra).',
    detailedDescription: 'Collection of 19 monumental geometric instruments designed by astronomer-king Sawai Jai Singh II to measure time and predict eclipses with millimeter precision.',
    duration: '1 Hour',
    category: 'Astronomical Monument',
    unesco: true,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SkLoAORvEfBzaIrspss0xXVmah3tZloWSAKP-RVkrGLx43IiEDuLaVHBakwAO3MJ2aoHxu9IdYcC2WnogCwXW0acxUQUZobkjiABl4BXPo_Nqvq3yjFbF4UBxQjHEbEO71fHYSSw=s1360-w1360-h1020-rw'
  },
  {
    id: 'jaipur-jal-mahal',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Jal Mahal (Water Palace Photo Stop)',
    shortDescription: 'Yellow sandstone Rajput palace floating gracefully in the center of Man Sagar Lake.',
    detailedDescription: 'Built in the 1750s as a royal shooting lodge. Four of its five storeys remain submerged under water, creating an enchanting reflection against the Aravalli hills.',
    duration: '30 Minutes',
    category: 'Lake Palace',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg/1280px-Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'jaipur-nahargarh',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Nahargarh Fort & Sunset Viewpoint',
    shortDescription: 'Ridgetop fortress offering breathtaking 360-degree sunset panoramas over the entire Pink City.',
    detailedDescription: 'Formed a northern defense barrier alongside Jaigarh and Amber. Features the Madhavendra Bhawan with interconnected royal suites for nine queens.',
    duration: '1.5 Hours',
    category: 'Fort & Panoramic View',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1591284080149-58e039950b29?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'jaipur-chokhi-dhani',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Chokhi Dhani Ethnic Cultural Village',
    shortDescription: 'Traditional Rajasthani fair with folk music, Kalbeliya dance, puppet shows, and royal thali dining.',
    detailedDescription: 'An evening celebration of village traditions featuring camel rides, acrobatics, potters at work, and an authentic sit-down feast served with pure ghee.',
    duration: '3 Hours',
    category: 'Cultural Evening & Dinner',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tyu7surSw6HkZ3Vwas2iSMdNL5QmRLktxTRN5rFp3w9tu9Yvh3wCglg4X2DMznzO3nQB6PAwAZLJn4GLI2BzjTnDMmCY72mgsCuqaAtRfhYzkm3XYvJoFhS43bt1k7R-Vm2EvS0VFf_fM=s1360-w1360-h1020-rw'
  },
  {
    id: 'jaipur-patrika-gate',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Patrika Gate & Albert Hall Museum',
    shortDescription: 'Vibrantly hand-painted architectural gateway and Rajasthan’s oldest museum building.',
    detailedDescription: 'Each archway of Patrika Gate portrays historical eras of Rajasthan in vivid fresco. Albert Hall showcases Indo-Saracenic design and royal artifacts.',
    duration: '1.5 Hours',
    category: 'Heritage & Museum',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TQn-LJrHPGp2eXgMz1_Np4CE7oD9ozDUYkH91Na8f5LXXu-00uCwULxT2ENFlgp0JAmiF4-3s59FUhACEO5wB6rsB56RYQKlnle_joR9O1stIYNXAuRfTKcL7hLHMM9-dlla85qw=s1360-w1360-h1020-rw'
  },
  {
    id: 'jaipur-jhalana-safari',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Jhalana Leopard Safari',
    shortDescription: 'India’s premier urban leopard reserve offering thrilling open-top 4x4 Gypsy wildlife safaris.',
    detailedDescription: 'Located in the Aravalli foothills of Jaipur, Jhalana Safari Park is India’s first designated leopard conservation reserve. Spanning over 20 sq km of dry deciduous forest, it offers high leopard sighting probability alongside striped hyenas, desert foxes, golden jackals, nilgai, and over 100 bird species explored via guided open-jeep safaris.',
    duration: '2.5–3 Hours',
    category: 'Wildlife & Safari',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Leopard-Jhalana-01.jpg/1280px-Leopard-Jhalana-01.jpg'
  },

  // ==========================================
  // MATHURA & VRINDAVAN
  // ==========================================
  {
    id: 'mv-janmabhoomi',
    destinationId: 'mathura-vrindavan',
    destinationName: 'Mathura & Vrindavan',
    name: 'Shri Krishna Janmabhoomi Temple',
    shortDescription: 'Sacred prison cell sanctum (Garbha Griha) marking the birth site of Lord Krishna.',
    detailedDescription: 'A pilgrimage site attracting millions, featuring intricate stone carvings, temple courtyards, and deep spiritual heritage along the Yamuna.',
    duration: '1.5 Hours',
    category: 'Pilgrimage Shrine',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk8-sHd4nTDKjYbAeLbJvkPnQRR-fxv6SCb_FlLzTGrr6XiY-NJA-GULMGoPcQgTYvLlaQLbUe76pT341sVv7BvadxvbjsB6QRh-XoDVHQitDF_0gcs3RbXYxIYAqrNp_PLR_Hlhw=s1360-w1360-h1020-rw'
  },
  {
    id: 'mv-prem-mandir',
    destinationId: 'mathura-vrindavan',
    destinationName: 'Mathura & Vrindavan',
    name: 'Prem Mandir Vrindavan',
    shortDescription: 'Magnificent white Italian marble temple with illuminated life-sized Krishna leela tableaux.',
    detailedDescription: 'Renowned for exquisite marble carvings depicting Radha Krishna pastimes, landscaped gardens, and a synchronized evening musical fountain show.',
    duration: '1.5 Hours',
    category: 'Spiritual Monument',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QajfI5eVs5fkc7omNMPyfF_jyRnInDGcPEW6P7lyDo7rq0stRMZyqPTeXQF0kEh2ug6rZwrTVs4_SyWHXGDPP18fFF-g18wDsC4s40BDj0x1LOuX9XulovYS_znKQuWhm25De8F22p5a-k=s1360-w1360-h1020-rw'
  },
  {
    id: 'mv-banke-bihari',
    destinationId: 'mathura-vrindavan',
    destinationName: 'Mathura & Vrindavan',
    name: 'Banke Bihari Temple Vrindavan',
    shortDescription: 'One of the most revered Krishna temples in India known for spontaneous bhakti singing and curtain darshan.',
    detailedDescription: 'Established by Swami Haridas, the deity of Banke Bihari stands in the Tribhanga posture. The temple echoes with devotional joy and vibrant flowers.',
    duration: '1 Hour',
    category: 'Sacred Temple',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1655885333110-22b955d35667?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFua2UlMjBCaWhhcmklMjBUZW1wbGUlMjBWcmluZGF2YW58ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'mv-iskcon',
    destinationId: 'mathura-vrindavan',
    destinationName: 'Mathura & Vrindavan',
    name: 'ISKCON Krishna Balaram Temple',
    shortDescription: 'White marble international Vedic temple complex famed for melodious 24-hour Hare Krishna kirtan.',
    detailedDescription: 'One of Vrindavan’s primary spiritual centers, featuring ornate deity altars, Prabhupada Samadhi, and serene courtyards with devotional music.',
    duration: '1 Hour',
    category: 'Pilgrimage Temple',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T6TZyvHDRvkewNYCHeUg9BG_z8CqfkUgZgNyo_AhPgjzYSgQyd_PcBr9-WLTqqa0djVodcvFiHIocHIl4ZcyOYmEg-sHBiaCvXkWvV9zDORewpzJHWFDGwOe8zNffKM0dgO_qM=s1360-w1360-h1020-rw'
  },

  // ==========================================
  // JODHPUR
  // ==========================================
  {
    id: 'jodhpur-mehrangarh',
    destinationId: 'jodhpur',
    destinationName: 'Jodhpur',
    name: 'Mehrangarh Fort',
    shortDescription: 'Formidable fortress perched 400 feet above the Blue City on perpendicular cliff ramparts.',
    detailedDescription: 'One of India’s best preserved forts, built in 1459 by Rao Jodha. Houses an armory, royal palanquin gallery, miniature paintings, and sweeping blue city views.',
    duration: '2.5 Hours',
    category: 'Hill Fortress & Museum',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'jodhpur-jaswant-thada',
    destinationId: 'jodhpur',
    destinationName: 'Jodhpur',
    name: 'Jaswant Thada (Taj of Marwar)',
    shortDescription: 'Delicate white marble cenotaph memorial built in 1899 with carved gazebos and tier gardens.',
    detailedDescription: 'Crafted from thin sheets of Makrana marble that emit a warm golden glow when sunlight passes through. Overlooks a serene desert lake.',
    duration: '1 Hour',
    category: 'Royal Memorial',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1647946411346-f5d403d483c4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'jodhpur-umaid-bhawan',
    destinationId: 'jodhpur',
    destinationName: 'Jodhpur',
    name: 'Umaid Bhawan Palace & Heritage Museum',
    shortDescription: 'One of the world’s largest private royal residences built in golden Chittar sandstone.',
    detailedDescription: 'Designed by British architect Henry Lanchester in art deco style. Features 347 rooms, manicured gardens, vintage car collections, and royal museum galleries.',
    duration: '1.5 Hours',
    category: 'Palace Museum',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sj-w4RD4SnjHWC0G3-vAuMQxBnoAjRrTExA4q-SqR1OFfRmcAaI87yL_Ndr5cBZXCX_FbbsKQUxGkDAxPMYkpRN3Z6b27G5xAYOQqiZQQsLgco8rLhWV5k4hZ1kYMDhcoauNyW=s1360-w1360-h1020-rw'
  },
  {
    id: 'jodhpur-mandore',
    destinationId: 'jodhpur',
    destinationName: 'Jodhpur',
    name: 'Mandore Gardens & Royal Cenotaphs',
    shortDescription: 'Ancient capital of Marwar featuring towering rock cenotaphs, high-rock temples, and lush gardens.',
    detailedDescription: 'A peaceful botanical sanctuary holding the intricately carved stone devals of Jodhpur’s erstwhile rulers alongside troop of friendly langur monkeys.',
    duration: '1.5 Hours',
    category: 'Heritage Gardens',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SZYe8_ImySEQTHZeKzRZp6qhhgcAQHfBFKPSdoGORzYj588AFcGDBoOtb0YhlXxmc8SWjIrgVUJ8n9j_lBL39r9zV8lxACM-efkKncYZ4vGg7mm5BjJ5RCAAqxsj6r3TCvcsE=s1360-w1360-h1020-rw'
  },
  {
    id: 'jodhpur-blue-city-walk',
    destinationId: 'jodhpur',
    destinationName: 'Jodhpur',
    name: 'Blue City Walking Tour & Clock Tower Bazaar',
    shortDescription: 'Guided walk through indigo-washed Brahmin alleys, spice emporiums, and the Sadar Bazaar clock tower.',
    detailedDescription: 'Immerse yourself in authentic old Jodhpur, sampling authentic mirchi vadas, mawa kachori, and photographing vivid indigo-painted courtyards.',
    duration: '1.5 Hours',
    category: 'Cultural Walk',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1759250452033-0648324d97b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8'
  },

  // ==========================================
  // UDAIPUR
  // ==========================================
  {
    id: 'udaipur-city-palace',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'City Palace Complex & Crystal Gallery',
    shortDescription: 'Rajasthan’s largest palace complex perched over the azure waters of Lake Pichola.',
    detailedDescription: 'Built over 400 years by the rulers of Mewar, combining Rajput and Mughal architectural styles with marble balconies, mirror inlays, and wall murals.',
    duration: '2.5 Hours',
    category: 'Palace Complex',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QfwKuIWmtX4czfGDD1VnxGvXM-6aAq-XCl5peRVQRbpSkvUQywYj-pefJBtOsgZQ1p22TCO2NevlIWFm99YkoUSoIYMQkTK9BjfTddvtWguJ8cS4oSyvhH0ECLKFWFNyXcdDmi=s1360-w1360-h1020-rw'
  },
  {
    id: 'udaipur-pichola-boat',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Lake Pichola Sunset Boat Cruise & Jag Mandir',
    shortDescription: 'Scenic boat cruise past the floating Taj Lake Palace to the island pleasure palace of Jag Mandir.',
    detailedDescription: 'Glide past the white ghats and royal palaces of Udaipur at golden hour, disembarking at Jag Mandir island with its carved stone elephant sentinels.',
    duration: '1.5 Hours',
    category: 'Scenic Boat Cruise',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Udaipur_Lake_India.JPG/1280px-Udaipur_Lake_India.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'udaipur-saheliyon-ki-bari',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Saheliyon-ki-Bari (Courtyard of Maidens)',
    shortDescription: 'Ornamental royal gardens featuring marble elephant fountains, lotus pools, and pavilions.',
    detailedDescription: 'Built in the 18th century by Maharana Sangram Singh for the queen and her 48 royal attendants to relax away from court politics.',
    duration: '1 Hour',
    category: 'Historic Gardens',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlS7NNbcXcKlK1UTEa4ibWy39inwgBfYjAz59kvDaJ_liVTlGth-vDgya3N9UMff7FRXlHJ0OaDRnt6_v0H2NhKSRXgZ8Z1nItCp6hlunVVsAbFlorFx5SESN-CcP_bzDcKM27ws5YLmYzF=s1360-w1360-h1020-rw'
  },
  {
    id: 'udaipur-bagore-ki-haveli',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Bagore Ki Haveli & Dharohar Folk Dance Show',
    shortDescription: '18th-century lakeside haveli at Gangaur Ghat hosting an evening Rajasthani folk dance and puppet performance.',
    detailedDescription: 'Features energetic Chari fire dancers, Kalbeliya serpent movements, and the world record Bhavai dancer balancing 11 brass pots on her head.',
    duration: '1.5 Hours',
    category: 'Cultural Dance Show',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1722080711528-095791cd14d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnb3JlJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'udaipur-monsoon-palace',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Sajjangarh Monsoon Palace Sunset Lookout',
    shortDescription: 'High hilltop white palace perched 3,100 feet above sea level with sweeping sunset vistas over lakes.',
    detailedDescription: 'Constructed by Maharana Sajjan Singh to track monsoon clouds, offering peerless panoramic views across the Udaipur basin and Aravalli mountain ranges.',
    duration: '1.5 Hours',
    category: 'Hilltop Palace & Sunset',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmuKHCm07tTvi_kQoSkxhTXysc422UarmQpl8ndRum8I_CHihe58mPmXhP8nfDnD_EG0c2rc7KddYfbL9H-N-U3_9rKH2rM534w9NycjfuNg_emOJsenNTkFKAcKro3Tt9l5AA-2g=s1360-w1360-h1020-rw'
  },

  // ==========================================
  // JAISALMER
  // ==========================================
  {
    id: 'jaisalmer-fort',
    destinationId: 'jaisalmer',
    destinationName: 'Jaisalmer',
    name: 'Jaisalmer Fort (Sonar Qila / Golden Fort)',
    shortDescription: 'A living UNESCO World Heritage golden sandstone fortress housing one-fourth of the old city.',
    detailedDescription: 'Built in 1156 AD by Rawal Jaisal. Wander through narrow lanes of merchant havelis, carved 12th-century Jain temples, and rooftop cannon bastions.',
    duration: '2.5 Hours',
    category: 'Living Hill Fort',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1713349881676-594b95a5742b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWRpdCUzQSUyMEphaXNhbG1lciUyMEZvcnQlMjAoU29uYXIlMjBRaWxhJTIwJTJGJTIwR29sZGVuJTIwRm9ydCl8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'jaisalmer-sam-dunes',
    destinationId: 'jaisalmer',
    destinationName: 'Jaisalmer',
    name: 'Sam Sand Dunes Camel Safari & Desert Camp',
    shortDescription: 'Sunset camel trek across Thar Desert ripple dunes followed by folk dance and campfire dinner.',
    detailedDescription: 'Ride across shifting golden sand dunes, watch desert sunsets, enjoy Kalbeliya tribal songs, and sleep in Swiss tents under star-studded skies.',
    duration: '4 Hours',
    category: 'Desert Adventure & Camp',
    unesco: false,
    image: 'https://plus.unsplash.com/premium_photo-1661936495413-875706d59696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FtJTIwU2FuZCUyMER1bmVzJTIwQ2FtZWwlMjBTYWZhcmklMjAlMjYlMjBEZXNlcnQlMjBDYW1wJTVDfGVufDB8fDB8fHww'
  },
  {
    id: 'jaisalmer-patwon-haveli',
    destinationId: 'jaisalmer',
    destinationName: 'Jaisalmer',
    name: 'Patwon Ki Haveli',
    shortDescription: 'Cluster of carved yellow sandstone merchant havelis with intricate stone jharokhas.',
    detailedDescription: 'Built over 50 years by a wealthy merchant family, showcasing the finest stone filigree carving and antique mirror frescoes in Rajasthan.',
    duration: '1.5 Hours',
    category: 'Heritage Haveli',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1677649117932-4c8abf3e27bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGF0d29uJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'jaisalmer-gadisar-lake',
    destinationId: 'jaisalmer',
    destinationName: 'Jaisalmer',
    name: 'Gadisar Lake & Desert Cultural Centre',
    shortDescription: 'Scenic 14th-century rainwater reservoir surrounded by carved yellow sandstone shrines and ghats.',
    detailedDescription: 'Offers peaceful boat rides among yellow stone cenotaphs rising from the water, migratory birds, and the famous Tillon Ki Pol carved gateway.',
    duration: '1 Hour',
    category: 'Scenic Lake & Shrines',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Main_entrance_of_Gadisar_Lake.jpg/1280px-Main_entrance_of_Gadisar_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // PUSHKAR
  // ==========================================
  {
    id: 'pushkar-brahma-temple',
    destinationId: 'pushkar',
    destinationName: 'Pushkar',
    name: 'Jagatpita Brahma Temple',
    shortDescription: 'One of the very few surviving temples in the world dedicated to Lord Brahma the Creator.',
    detailedDescription: 'Dating back to the 14th century with marble steps, silver coin inlays, and a red spire, serving as the central pilgrim shrine of Pushkar.',
    duration: '1 Hour',
    category: 'Rare Pilgrim Temple',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Brahma_Temple%2C_Pushkar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  },
  {
    id: 'pushkar-lake-ghats',
    destinationId: 'pushkar',
    destinationName: 'Pushkar',
    name: 'Pushkar Holy Lake & 52 Bathing Ghats',
    shortDescription: 'Sacred desert lake believed to have appeared where Lord Brahma dropped a lotus petal.',
    detailedDescription: 'Surrounded by whitewashed temples and 52 ghats where pilgrims perform prayers and evening chants echo across the calm water.',
    duration: '1 Hour',
    category: 'Sacred Water Shrine',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Evening_lights_by_the_Pushkar_Lake%2C_Pushkar.jpg/1280px-Evening_lights_by_the_Pushkar_Lake%2C_Pushkar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'pushkar-savitri-temple',
    destinationId: 'pushkar',
    destinationName: 'Pushkar',
    name: 'Savitri Devi Temple & Ratnagiri Hill Ropeway',
    shortDescription: 'Hilltop shrine reachable by scenic ropeway cable car offering birds-eye views of the sacred town and Thar desert.',
    detailedDescription: 'Dedicated to Goddess Savitri, Lord Brahma’s consort. A premier spot for early sunrise and late afternoon panoramas.',
    duration: '1.5 Hours',
    category: 'Hilltop Temple & Cable Car',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Pushkar.jpg/1280px-Pushkar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // RANTHAMBORE
  // ==========================================
  {
    id: 'ranthambore-tiger-safari',
    destinationId: 'ranthambore',
    destinationName: 'Ranthambore',
    name: 'Ranthambore Jungle Safari (Zones 1–5 / 6–10)',
    shortDescription: 'Open-top 4x4 Gypsy tiger tracking safari through dry deciduous forests and lake ruins.',
    detailedDescription: 'One of the best places in the world to observe wild Royal Bengal tigers hunting around ancient banyan trees, lakes, and cenotaph ruins.',
    duration: '3.5 Hours',
    category: 'Wildlife Tiger Safari',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Ranthambore_National_Park.JPG/1280px-Ranthambore_National_Park.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'ranthambore-fort',
    destinationId: 'ranthambore',
    destinationName: 'Ranthambore',
    name: 'Ranthambore Fort & Trinetra Ganesh Temple',
    shortDescription: '10th-century UNESCO cliff fortress surrounded by the wildlife park, home to the three-eyed Ganesh temple.',
    detailedDescription: 'Provides sweeping views of the national park lakes and tiger reserve forests below, with thousands of pilgrims mailing wedding invites to the deity.',
    duration: '2 Hours',
    category: 'UNESCO Forest Fort',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Ranthambhore_Fort.jpg/1280px-Ranthambhore_Fort.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // BIKANER
  // ==========================================
  {
    id: 'bikaner-junagarh-fort',
    destinationId: 'bikaner',
    destinationName: 'Bikaner',
    name: 'Junagarh Fort & Museum Complex',
    shortDescription: 'Imposing 16th-century red sandstone fortress that was never conquered in history.',
    detailedDescription: 'Built by Raja Rai Singh, housing lavishly decorated royal apartments: Anup Mahal with gold leaf lacquer, Badal Mahal depicting rain clouds, and Karan Mahal.',
    duration: '2 Hours',
    category: 'Unconquered Fortress',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/India_Bikaner_Junagarh_Fort.jpg/1280px-India_Bikaner_Junagarh_Fort.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'bikaner-karni-mata',
    destinationId: 'bikaner',
    destinationName: 'Bikaner',
    name: 'Karni Mata Temple (Deshnoke Rat Temple)',
    shortDescription: 'World-famous 600-year-old temple sheltering over 25,000 revered sacred black rats (kabbas).',
    detailedDescription: 'An extraordinary spiritual sanctum where sighting a rare white rat is considered an auspicious blessing. Built with pure white Makrana marble facade.',
    duration: '1.5 Hours',
    category: 'Sacred Pilgrimage',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/20191212_%C5%9Awi%C4%85tynia_Karni_Maty_w_De%C5%9Bnok_1031_8078_DxO.jpg/1280px-20191212_%C5%9Awi%C4%85tynia_Karni_Maty_w_De%C5%9Bnok_1031_8078_DxO.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'bikaner-camel-research',
    destinationId: 'bikaner',
    destinationName: 'Bikaner',
    name: 'National Research Centre on Camel & Safari',
    shortDescription: 'Asia’s premier camel breeding farm featuring camel rides, research museum, and fresh camel milk ice cream.',
    detailedDescription: 'Observe hundreds of desert camels across Bikaneri, Jaisalmeri, and Marwari breeds while learning about desert ecology and breeding programs.',
    duration: '1.5 Hours',
    category: 'Desert Wildlife Activity',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/India_Bikaner_Junagarh_Fort.jpg/1280px-India_Bikaner_Junagarh_Fort.jpg'
  },
  {
    id: 'bikaner-rampuria-havelis',
    destinationId: 'bikaner',
    destinationName: 'Bikaner',
    name: 'Rampuria Havelis & Lalgarh Palace',
    shortDescription: 'Spectacular red sandstone merchant havelis with intricate stone lattices and Victorian royal palace.',
    detailedDescription: 'Walk through narrow cobblestone lanes of the old walled city to marvel at the 400-year-old red sandstone jharokhas of wealthy Marwari traders.',
    duration: '1.5 Hours',
    category: 'Heritage Architecture',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/The_Laxmi_Niwas_Palace%2C_Bikaner%2C_Rajasthan.jpg/1280px-The_Laxmi_Niwas_Palace%2C_Bikaner%2C_Rajasthan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // VARANASI
  // ==========================================
  {
    id: 'varanasi-ganga-aarti',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Dashashwamedh Ghat',
    shortDescription: 'Mesmerizing evening prayer ritual conducted with multi-tiered brass oil lamps, incense, and conch shells.',
    detailedDescription: 'Witnessed from wooden boats on the sacred Ganges as seven young priests choreograph fiery offerings to Mother Ganga in unison.',
    duration: '1.5 Hours',
    category: 'Spiritual River Ritual',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/1280px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'varanasi-sunrise-boat',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Sunrise Boat Cruise along Varanasi Ghats',
    shortDescription: 'Dawn rowing boat journey along Manikarnika, Assi, and Harishchandra Ghats witnessing ancient morning rituals.',
    detailedDescription: 'Watch the sunrise bathe the ancient palatial riverfront in golden amber, as pilgrims perform Surya Namaskar and temple bells chime.',
    duration: '2 Hours',
    category: 'Scenic Boat Journey',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'varanasi-kashi-vishwanath',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Shri Kashi Vishwanath Temple',
    shortDescription: 'One of the twelve sacred Jyotirlingas, crowned by a one-ton pure gold dome.',
    detailedDescription: 'The spiritual heart of Varanasi, dedicated to Lord Shiva as Vishwanatha (Lord of the Universe), connected to the Ganges by the new temple corridor.',
    duration: '2 Hours',
    category: 'Jyotirlinga Temple',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  },
  {
    id: 'varanasi-sarnath',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Sarnath Buddhist Pilgrimage & Dhamek Stupa',
    shortDescription: 'Sacred deer park where Gautama Buddha taught his first sermon after attaining enlightenment.',
    detailedDescription: 'A revered Buddhist site featuring the colossal 43-meter Dhamek Stupa, Ashoka Pillar ruins, and the Sarnath Archaeological Museum.',
    duration: '2 Hours',
    category: 'Buddhist Heritage',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg/1280px-Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'varanasi-silk-weaving',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Banaras Silk Weaving Workshop & Old Alleys',
    shortDescription: 'Experience master weavers crafting gold zari Banarasi sarees on centuries-old wooden pit looms.',
    detailedDescription: 'Explore narrow bazaar alleys to observe traditional handloom weaving techniques passed down through generations of artisan families.',
    duration: '1.5 Hours',
    category: 'Artisan Workshop',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // AMRITSAR
  // ==========================================
  {
    id: 'amritsar-golden-temple',
    destinationId: 'amritsar',
    destinationName: 'Amritsar',
    name: 'Sri Harmandir Sahib (The Golden Temple & Langar)',
    shortDescription: 'The spiritual heart of Sikhism crowned in 750 kg of pure gold leaf, encircled by the Amrit Sarovar pool.',
    detailedDescription: 'Open to all humankind with four doors representing openness. Visit the sacred sanctum, hear continuous live Gurbani kirtan, and experience the world’s largest free community kitchen (Langar).',
    duration: '3 Hours',
    category: 'Sacred Sikh Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1730620776114-876458fdbf2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGhlJTIwR29sZGVuJTIwVGVtcGxlfGVufDB8fDB8fHww'
  },
  {
    id: 'amritsar-wagah-border',
    destinationId: 'amritsar',
    destinationName: 'Amritsar',
    name: 'Wagah Border Beating Retreat Ceremony',
    shortDescription: 'Electrifying daily military flag-lowering parade between Indian BSF and Pakistani Rangers.',
    detailedDescription: 'A synchronized high-energy drill conducted with theatrical goose-stepping, trumpet calls, and thunderous patriotic chanting before international border gates close at sunset.',
    duration: '3 Hours',
    category: 'Patriotic Military Ceremony',
    unesco: false,
    image: 'https://s7ap1.scene7.com/is/image/incredibleindia/attari-wagah-border-amritsar-punjab-6-musthead-hero?qlt=82&ts=1726662188697'
  },
  {
    id: 'amritsar-jallianwala-bagh',
    destinationId: 'amritsar',
    destinationName: 'Amritsar',
    name: 'Jallianwala Bagh National Memorial',
    shortDescription: 'Historic public garden memorial commemorating the martyrs of the fateful 1919 independence movement.',
    detailedDescription: 'Preserves the original brick walls riddled with British bullet marks, the Martyr’s Well, and the eternal flame memorializing the freedom struggle.',
    duration: '1 Hour',
    category: 'Historical Memorial',
    unesco: false,
    image: 'https://plus.unsplash.com/premium_photo-1697729441943-f1bffee0b432?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SmFsbGlhbndhbGElMjBCYWdoJTIwTmF0aW9uYWwlMjBNZW1vcmlhbHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'amritsar-gobindgarh',
    destinationId: 'amritsar',
    destinationName: 'Amritsar',
    name: 'Gobindgarh Fort & Old Amritsar Food Walk',
    shortDescription: '18th-century military fort of Maharaja Ranjit Singh followed by authentic Amritsari kulcha and lassi tasting.',
    detailedDescription: 'Houses the Toshakhana coin museum, martial arts demonstrations, and culinary tours of century-old food stalls in the heritage walled city.',
    duration: '2 Hours',
    category: 'Fort & Culinary Tour',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Gobindgarh_fort%2C_Amritsar%2C_Punjab%2C_India.jpg/1280px-Gobindgarh_fort%2C_Amritsar%2C_Punjab%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // SHIMLA
  // ==========================================
  {
    id: 'shimla-ridge-mall',
    destinationId: 'shimla',
    destinationName: 'Shimla',
    name: 'The Ridge & Mall Road Walking Tour',
    shortDescription: 'Pedestrian colonial promenade with neo-Gothic Christ Church and panoramic Himalayan vistas.',
    detailedDescription: 'The social hub of Shimla free from vehicular traffic, featuring Gaiety Theatre, Tudor-style town halls, craft emporiums, and sunset lookouts.',
    duration: '2 Hours',
    category: 'Colonial Promenade',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/960px-The_Ridge_Shimla_5.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
  },
  {
    id: 'shimla-kufri',
    destinationId: 'shimla',
    destinationName: 'Shimla',
    name: 'Kufri Adventure Park & Snow Viewpoint',
    shortDescription: 'High-altitude hill resort at 8,600 feet offering horse rides, Himalayan wildlife, and winter snow activities.',
    detailedDescription: 'Famous for Mahasu Peak views, apple orchards, yak rides, and tobogganing slopes overlooking snow-covered Himalayan peaks.',
    duration: '3 Hours',
    category: 'Hill Adventure Resort',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl64eckwYYzIMR5lbqXGYdHSKT1uDPI6yoADwvUifsS5RgOoZzRmW2OuP4-bE4XGSplGIEP0yEqKy7zgfv9xTqzEraQt8VwjI1Raya8o4UbLOypj-d_1mjPXlPFi-RqNZ8raUdluw=s1360-w1360-h1020-rw'
  },
  {
    id: 'shimla-jakhoo-temple',
    destinationId: 'shimla',
    destinationName: 'Shimla',
    name: 'Jakhoo Temple & Aerial Ropeway',
    shortDescription: 'Highest peak in Shimla (8,050 feet) crowned by a monumental 108-foot orange statue of Lord Hanuman.',
    detailedDescription: 'Accessible via a scenic aerial ropeway cable car from the Ridge, offering panoramic views of the Shivalik hill ranges and forested valleys.',
    duration: '1.5 Hours',
    category: 'Hilltop Shrine & Cable Car',
    unesco: false,
    image: 'https://www.thestatesman.com/wp-content/uploads/2023/04/5D59F9E7-7572-40E1-A9E8-779237EA23BB.jpeg'
  },
  {
    id: 'shimla-viceregal-lodge',
    destinationId: 'shimla',
    destinationName: 'Shimla',
    name: 'Viceregal Lodge (Rashtrapati Niwas)',
    shortDescription: 'Magnificent Jacobethan stone estate that served as the summer headquarters of the British Viceroy.',
    detailedDescription: 'Surrounded by manicured pine lawns, where historic partition conferences occurred. Today houses the Indian Institute of Advanced Study.',
    duration: '1.5 Hours',
    category: 'Colonial Heritage Estate',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SXtRMzSBImxKU_USO2dDejbTYtw7rGykDdZl3A8G9OlGEP6L27fr9IILEN69ZK3H7S4UmOam-rALD5UHfw5H3WfWNeG9R7uAzJnVjLj8TwkI2JhqsHUiOccWdP0X2LRDo3YbMT=s1360-w1360-h1020-rw'
  },

  // ==========================================
  // MANALI
  // ==========================================
  {
    id: 'manali-solang-valley',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Solang Valley Adventure Activities',
    shortDescription: 'Premier alpine adventure arena for paragliding, zorbing, quad biking, and winter ski slopes.',
    detailedDescription: 'Nestled between Solang village and Beas Kund glacier, offering tandem paragliding soaring over alpine pine meadows and snow activities.',
    duration: '3.5 Hours',
    category: 'Mountain Adventure Arena',
    unesco: false,
    image: 'https://www.snowvalleyresorts.com/wp-content/uploads/featurd-image-min-915x513.webp'
  },
  {
    id: 'manali-atal-tunnel',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Atal Tunnel & Sissu Waterfall (Lahaul Valley)',
    shortDescription: 'Drive through the world’s longest highway tunnel (9.02 km) at 10,000 feet into trans-Himalayan Lahaul.',
    detailedDescription: 'Cross beneath the Pir Panjal range to enter the dramatically stark landscape of Sissu village with its cascading glacial waterfall and suspension bridge.',
    duration: '4 Hours',
    category: 'Engineering Marvel & Excursion',
    unesco: false,
    image: 'https://images.pexels.com/photos/29494193/pexels-photo-29494193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    id: 'manali-hadimba-temple',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Hadimba Devi Wooden Temple & Dhungri Van Vihar',
    shortDescription: '16th-century pagoda-style cedar wood temple hidden inside ancient deodar pine forests of Dhungri.',
    detailedDescription: 'Built in 1553 AD around a natural cave sanctum. Celebrated for intricate wooden carvings of animals, folk dancers, and tranquil forest atmosphere.',
    duration: '1 Hour',
    category: 'Heritage Wood Temple',
    unesco: false,
    image: 'https://media.istockphoto.com/id/1334792935/photo/hidimba-devi-or-hadimba-temple-manali.webp?a=1&b=1&s=612x612&w=0&k=20&c=r3fEFiD_DH2rJ_DuIbAP1Au9cpnxtRvsL-k6fF4KON8='
  },
  {
    id: 'manali-rohtang-pass',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Rohtang Pass Snow Excursion (13,058 ft)',
    shortDescription: 'High-altitude mountain pass connecting Kullu with Lahaul and Spiti, offering year-round glacier snow.',
    detailedDescription: 'Witness dramatic high-altitude vistas, glacier waterfalls, and enjoy snow scooter rides and skiing against the backdrop of towering Himalayan peaks.',
    duration: '5 Hours',
    category: 'Glacier Snow Pass',
    unesco: false,
    image: 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg'
  },
  {
    id: 'manali-old-manali',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Old Manali Village & Vashisht Hot Sulphur Springs',
    shortDescription: 'Traditional timber-and-stone village with bohemian cafes and natural mineral hot water healing baths.',
    detailedDescription: 'A laid-back cultural walk through rustic wooden houses, apple orchards, and the ancient stone temple dedicated to Sage Vashisht.',
    duration: '2 Hours',
    category: 'Cultural Village & Thermal Springs',
    unesco: false,
    image: 'https://manalitourism.co.in/images/places-to-visit/headers/hot-water-springs-at-vashisht-temple-manali-header-manali-tourism.jpg.jpg'
  },

  // ==========================================
  // DHARAMSHALA & MCLEODGANJ
  // ==========================================
  {
    id: 'dharamshala-dalai-lama-temple',
    destinationId: 'dharamshala',
    destinationName: 'Dharamshala',
    name: 'Tsuglagkhang Complex (Dalai Lama Temple & Monastery)',
    shortDescription: 'The spiritual heart of Tibetan Buddhism in exile, home to His Holiness the 14th Dalai Lama.',
    detailedDescription: 'Visit the revered main prayer hall with statues of Avalokiteshvara and Padmasambhava, spin sacred prayer wheels, and walk the tranquil Kora meditation path.',
    duration: '2 Hours',
    category: 'Tibetan Buddhist Complex',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw'
  },
  {
    id: 'dharamshala-hpca-stadium',
    destinationId: 'dharamshala',
    destinationName: 'Dharamshala',
    name: 'HPCA International Cricket Stadium',
    shortDescription: 'World’s most picturesque cricket stadium set at 4,780 feet against the snow-clad Dhauladhar peaks.',
    detailedDescription: 'Famous for its vibrant Tibetan-style pavilion architecture and awe-inspiring backdrop of sheer mountain rock and pine forests.',
    duration: '1 Hour',
    category: 'Scenic Stadium & Monument',
    unesco: false,
    image: 'https://www.swantour.com/blogs/wp-content/uploads/2020/01/Dharamsala-Cricket-Stadium.jpg'
  },
  {
    id: 'dharamshala-bhagsu-waterfall',
    destinationId: 'dharamshala',
    destinationName: 'Dharamshala',
    name: 'Bhagsunath Temple & Waterfall Hike',
    shortDescription: 'Ancient Lord Shiva temple, freshwater swimming pool, and scenic mountain trail to Bhagsunath waterfall.',
    detailedDescription: 'Enjoy a light mountain hike along mountain streams to the roaring waterfall with famous cliffside cafes serving herbal teas and pancakes.',
    duration: '2 Hours',
    category: 'Nature Hike & Temple',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Bhagsu_view.jpg/1280px-Bhagsu_view.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'dharamshala-norbulingka',
    destinationId: 'dharamshala',
    destinationName: 'Dharamshala',
    name: 'Norbulingka Tibetan Cultural Institute',
    shortDescription: 'Tranquil Japanese-inspired gardens preserving Tibetan Thangka painting, woodcarving, and bronze casting.',
    detailedDescription: 'Dedicated to keeping traditional Tibetan arts alive through live artisan workshops, shaded bamboo walkways, and traditional tea houses.',
    duration: '1.5 Hours',
    category: 'Cultural Art Institute',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Norbulingka_Institute%2C_with_Dhauladhar_range_in_the_background.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  },

  // ==========================================
  // SRINAGAR
  // ==========================================
  {
    id: 'srinagar-dal-lake-shikara',
    destinationId: 'srinagar',
    destinationName: 'Srinagar',
    name: 'Dal Lake Sunset Shikara Ride & Floating Markets',
    shortDescription: 'Romantic wooden boat cruise through lotus gardens, floating handicraft shops, and Char Chinar island.',
    detailedDescription: 'Glide gently on traditional velvet-cushioned wooden boats over mirror-still waters reflecting snow-peaked Pir Panjal mountains.',
    duration: '2 Hours',
    category: 'Iconic Lake Experience',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'srinagar-mughal-gardens',
    destinationId: 'srinagar',
    destinationName: 'Srinagar',
    name: 'Mughal Gardens (Nishat & Shalimar Bagh)',
    shortDescription: 'Terraced imperial Mughal water gardens with cascading fountains and centuries-old chinar trees.',
    detailedDescription: 'Built by Emperors Jahangir and Shah Jahan on the banks of Dal Lake, featuring tiered fountains, flower beds, and pavilion terraces.',
    duration: '2 Hours',
    category: 'Imperial Gardens',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Shalimar_Bagh_1.jpg/1280px-Shalimar_Bagh_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'srinagar-shankaracharya',
    destinationId: 'srinagar',
    destinationName: 'Srinagar',
    name: 'Shankaracharya Hilltop Temple',
    shortDescription: 'Ancient 9th-century stone Shiva temple perched atop Gopadari Hill overlooking the entire Kashmir Valley.',
    detailedDescription: 'Climb 240 stone stairs to reach the historic sanctum where Adi Shankaracharya meditated, commanding magnificent birds-eye views of Dal Lake and Srinagar city.',
    duration: '1.5 Hours',
    category: 'Hilltop Sacred Shrine',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/The_Ancient_Shankaracharya_Temple_%28Srinagar%2C_Jammu_and_Kashmir%29_%28cropped%29.jpg/1280px-The_Ancient_Shankaracharya_Temple_%28Srinagar%2C_Jammu_and_Kashmir%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'srinagar-old-city-heritage',
    destinationId: 'srinagar',
    destinationName: 'Srinagar',
    name: 'Srinagar Heritage Walk & Jamia Masjid',
    shortDescription: 'Colossal wooden Indo-Saracenic mosque with 378 deodar pillars, wooden bridges, and spice emporiums.',
    detailedDescription: 'Explore Old Srinagar along the Jhelum River, visiting the wooden Shah-i-Hamadan shrine, spice markets, and walnut woodcarving workshops.',
    duration: '2 Hours',
    category: 'Heritage Walk',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Jama_Masjid%2C_Srinagar_%2814363005587%29.jpg/1280px-Jama_Masjid%2C_Srinagar_%2814363005587%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // GULMARG
  // ==========================================
  {
    id: 'gulmarg-gondola',
    destinationId: 'gulmarg',
    destinationName: 'Gulmarg',
    name: 'Gulmarg Gondola (Kongdoori & Apharwat Peak)',
    shortDescription: 'World’s highest operating cable car taking visitors up to 13,780 feet onto glacier snowfields.',
    detailedDescription: 'Soar above pine canopies into the alpine tundra of Mount Apharwat near the LOC. Enjoy snow walks, sledging, skiing, and panoramic Himalayan vistas.',
    duration: '3.5 Hours',
    category: 'High Altitude Gondola & Snow',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Gulmarg_gondola.JPG/1280px-Gulmarg_gondola.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'gulmarg-golf-course',
    destinationId: 'gulmarg',
    destinationName: 'Gulmarg',
    name: 'Gulmarg Meadow Walk & Historic Golf Course',
    shortDescription: 'One of the world’s highest green 18-hole golf courses surrounded by rolling wildflower meadows.',
    detailedDescription: 'Stroll across lush alpine meadows lined with pine forests, colonial British cottages, and wild lupines blooming in summer.',
    duration: '1.5 Hours',
    category: 'Alpine Meadow Walk',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Ancient_Temple%2C_Gulmarg.jpg/1280px-Ancient_Temple%2C_Gulmarg.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'gulmarg-st-marys',
    destinationId: 'gulmarg',
    destinationName: 'Gulmarg',
    name: 'St. Mary’s Church & Strawberry Valley',
    shortDescription: 'Victorian stone church built in 1902 standing quietly in the snowfields, alongside sweet strawberry meadows.',
    detailedDescription: 'A postcard-perfect heritage site with stained glass windows and stone bell tower surrounded by alpine deodar forest.',
    duration: '1 Hour',
    category: 'Heritage Church & Valley',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/St._Mary%27s_Church%2C_Gulmarg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original'
  },

  // ==========================================
  // PAHALGAM
  // ==========================================
  {
    id: 'pahalgam-valleys',
    destinationId: 'pahalgam',
    destinationName: 'Pahalgam',
    name: 'Betaab Valley & Aru Valley Excursion',
    shortDescription: 'Spectacular river valley surrounded by snow-covered peaks, lush meadows, and gushing streams.',
    detailedDescription: 'Named after the famous Bollywood film shot here. Visit the idyllic mountain meadows of Aru, Betaab valley, and the banks of the Lidder River.',
    duration: '3.5 Hours',
    category: 'Scenic Alpine Valley',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Betaab_Valley.jpg/1280px-Betaab_Valley.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'pahalgam-baisaran',
    destinationId: 'pahalgam',
    destinationName: 'Pahalgam',
    name: 'Baisaran Meadow (Mini Switzerland) Pony Trek',
    shortDescription: 'Gentle pony trek through dense deodar forests opening onto panoramic emerald hilltop meadows.',
    detailedDescription: 'A pristine mountain meadow ringed by snow-dusted peaks and pine woods, offering zorbing, horse riding, and picnic spots.',
    duration: '2.5 Hours',
    category: 'Pony Trek & Alpine Meadow',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Mini_Switzerland_of_india_photo.jpg/1280px-Mini_Switzerland_of_india_photo.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'pahalgam-lidder-river',
    destinationId: 'pahalgam',
    destinationName: 'Pahalgam',
    name: 'Lidder River Walk & Trout Angling',
    shortDescription: 'Crystal-clear glacial mountain river famous for brown trout fishing and serene riverside strolls.',
    detailedDescription: 'Listen to the roar of glacial meltwater cascading over boulders, visit trout farms, and enjoy fresh Kashmiri riverfront barbecues.',
    duration: '1.5 Hours',
    category: 'Riverside Nature Walk',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Lidder_River_1.jpg/1280px-Lidder_River_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // RISHIKESH
  // ==========================================
  {
    id: 'rishikesh-ganga-aarti',
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh',
    name: 'Triveni Ghat Evening Maha Aarti & Ram Jhula',
    shortDescription: 'Soulful sunset river prayer with oil lamps floating down the crystal-clear Ganges.',
    detailedDescription: 'Join thousands of pilgrims chanting Vedic hymns as large brass diyas are swayed in prayer at the holy confluence of three sacred rivers.',
    duration: '2 Hours',
    category: 'Spiritual River Aarti',
    unesco: false,
    image: 'https://img.avianexperiences.com/trek/2d3f1914-76ba-492d-a875-f90361caaaa7'
  },
  {
    id: 'rishikesh-parmarth-niketan',
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh',
    name: 'Parmarth Niketan Ashram',
    shortDescription: 'Largest spiritual ashram in Rishikesh famed for sacred evening Ganga Aarti and yoga gardens.',
    detailedDescription: 'Nestled on the holy banks of the Ganga in Swargashram, home to daily universal prayer, meditation, yoga retreats, and the world-renowned evening Ganga Aarti at sunset.',
    duration: '2 Hours',
    category: 'Spiritual Ashram & Ganga Aarti',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1718383537262-2236fd7c8180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFybWFydGglMjBOaWtldGFuJTIwQXNocmFtfGVufDB8fDB8fHww'
  },
  {
    id: 'rishikesh-river-rafting',
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh',
    name: 'White Water River Rafting (Shivpuri to Rishikesh)',
    shortDescription: 'Thrilling 16-km river rafting adventure over Grade III and IV rapids on the glacial Ganges.',
    detailedDescription: 'Navigate famous rapids including Roller Coaster, Golf Course, and Club House guided by international certified river rescue guides.',
    duration: '3 Hours',
    category: 'River Adventure Sport',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/1280px-Trayambakeshwar_Temple_VK.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'rishikesh-beatles-ashram',
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh',
    name: 'The Beatles Ashram (Chaurasi Kutia) & Meditation',
    shortDescription: 'Historic jungle ashram of Maharishi Mahesh Yogi where the Beatles composed the White Album in 1968.',
    detailedDescription: 'Now part of Rajaji Tiger Reserve, featuring 84 stone meditation caves, colorful pop-art murals, and a tranquil woodland sanctuary.',
    duration: '2 Hours',
    category: 'Cultural Heritage Ashram',
    unesco: false,
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/r/32/77/f4/61/caption.jpg'
  },
  {
    id: 'rishikesh-neelkanth',
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh',
    name: 'Neelkanth Mahadev Temple & Cliff Views',
    shortDescription: 'Sacred mountain shrine dedicated to Lord Shiva at 4,300 feet surrounded by dense forested hills.',
    detailedDescription: 'Legend marks this as the spot where Shiva consumed the cosmic poison (Halahala) during the churning of the ocean, turning his throat blue.',
    duration: '2.5 Hours',
    category: 'Hilltop Pilgrimage',
    unesco: false,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNOCSkFcwAuGavdINXh1Keytlh7JOR8djKGWvINmzplGPRkxvUfCanEwJ&s=10'
  },

  // ==========================================
  // HARIDWAR
  // ==========================================
  {
    id: 'haridwar-har-ki-pauri',
    destinationId: 'haridwar',
    destinationName: 'Haridwar',
    name: 'Har Ki Pauri Evening Ganga Aarti',
    shortDescription: 'Spectacular sunset aarti ceremony at the Footstep of God where thousands of floating leaf lamps illuminate the river.',
    detailedDescription: 'One of the most sacred pilgrimage ghats in India. The swift waters reflect hundreds of illuminated lanterns while conch shells echo in reverence.',
    duration: '2 Hours',
    category: 'World Famous Pilgrimage Aarti',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1728272355265-173820e9d673?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEhhciUyMEtpJTIwUGF1cmklMjBFdmVuaW5nJTIwR2FuZ2ElMjBBYXJ0aXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'haridwar-mansa-devi',
    destinationId: 'haridwar',
    destinationName: 'Haridwar',
    name: 'Mansa Devi Temple & Udankhatola Ropeway',
    shortDescription: 'Hilltop wish-fulfilling goddess temple atop Bilwa Parvat reachable by scenic aerial cable car.',
    detailedDescription: 'Pilgrims tie holy threads to tree branches praying for wishes to be granted, while taking in sweeping views of the Ganges plain.',
    duration: '1.5 Hours',
    category: 'Hilltop Temple & Cable Car',
    unesco: false,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABGy90fvqsgDdn4yiFzC0XDNpeqNtFggyajkB74bLLw&s=10'
  },
  {
    id: 'haridwar-chandi-devi',
    destinationId: 'haridwar',
    destinationName: 'Haridwar',
    name: 'Chandi Devi Temple & Neel Parvat Trek',
    shortDescription: 'Ancient 8th-century temple established by Adi Shankaracharya atop Neel Parvat hill.',
    detailedDescription: 'Accessible by ropeway or hillside trek, offering panoramic vistas over Haridwar and the serene Shivalik foothills.',
    duration: '1.5 Hours',
    category: 'Sacred Hilltop Shrine',
    unesco: false,
    image: 'https://blog.yatradham.org/wp-content/uploads/2020/02/Chandi-Devi-Temple.jpg'
  },

  // ==========================================
  // BHARATPUR
  // ==========================================
  {
    id: 'bharatpur-keoladeo',
    destinationId: 'bharatpur',
    destinationName: 'Bharatpur',
    name: 'Keoladeo Ghana National Park (UNESCO Bird Sanctuary)',
    shortDescription: 'World-renowned wetland sanctuary hosting over 370 resident & migratory bird species.',
    detailedDescription: 'Explore by silent cycle rickshaw pedaled by certified naturalist guides. Spot painted storks, pelicans, Siberian cranes, and pythons basking in marshes.',
    duration: '3 Hours',
    category: 'UNESCO Wildlife Sanctuary',
    unesco: true,
    image: 'https://www.rajasthancab.com/uploads/blog/1744708899-blog-image.webp'
  },
  {
    id: 'bharatpur-lohagarh',
    destinationId: 'bharatpur',
    destinationName: 'Bharatpur',
    name: 'Lohagarh Fort (Iron Fort) & Government Museum',
    shortDescription: 'Virtually impenetrable 18th-century moat fortress built by Jat Maharaja Suraj Mal.',
    detailedDescription: 'Surrounded by deep water moats that withstood repeated British sieges. Houses an impressive archaeological museum of antique arms, sculptures, and coins.',
    duration: '1.5 Hours',
    category: 'Historic Moat Fort',
    unesco: false,
    image: 'https://s7ap1.scene7.com/is/image/incredibleindia/bharatpur-palace-and-museum-bharatpur-rajasthan-tri-hero?qlt=82&ts=1727166273101'
  },

  // ==========================================
  // MUMBAI
  // ==========================================
  {
    id: 'mumbai-gateway-india',
    destinationId: 'mumbai',
    destinationName: 'Mumbai',
    name: 'Gateway of India & Taj Mahal Palace Hotel',
    shortDescription: 'Iconic 26-meter basalt triumphal arch built in 1924 overlooking the Arabian Sea harbor.',
    detailedDescription: 'Mumbai’s foremost colonial landmark facing the storied Taj Mahal Palace hotel, where ferry boats depart for Elephanta Island.',
    duration: '1.5 Hours',
    category: 'Historic Monument',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'mumbai-marine-drive',
    destinationId: 'mumbai',
    destinationName: 'Mumbai',
    name: 'Marine Drive & Queen’s Necklace Sunset Walk',
    shortDescription: '3-kilometer arc-shaped seaside boulevard illuminated with glittering street lamps at twilight.',
    detailedDescription: 'Stroll along the Arabian Sea promenade from Nariman Point to Girgaon Chowpatty beach, feeling cool sea breezes and sampling local kulfi.',
    duration: '1.5 Hours',
    category: 'Seaside Promenade',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg/1280px-Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'mumbai-cst-terminus',
    destinationId: 'mumbai',
    destinationName: 'Mumbai',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    shortDescription: 'UNESCO-listed High Victorian Gothic railway terminus with gargoyles, turrets, and stained glass.',
    detailedDescription: 'Designed by F.W. Stevens and opened in 1887. An architectural masterpiece combining Victorian Italianate Gothic Revival with traditional Indian court palace motifs.',
    duration: '1 Hour',
    category: 'UNESCO Victorian Heritage',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Chhatrapati_shivaji_terminus%2C_esterno_01.jpg/1280px-Chhatrapati_shivaji_terminus%2C_esterno_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'mumbai-elephanta-caves',
    destinationId: 'mumbai',
    destinationName: 'Mumbai',
    name: 'Elephanta Island Rock-Cut Shiva Caves',
    shortDescription: 'UNESCO-listed 5th-century rock-cut cave temples dedicated to Shiva, reached by harbor ferry.',
    detailedDescription: 'Features the world-famous 6-meter-high three-headed Sadashiva sculpture portraying creator, preserver, and destroyer aspects of divinity.',
    duration: '3.5 Hours',
    category: 'UNESCO Rock-Cut Caves & Boat',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Elephanta_Caves_Trimurti.jpg/1280px-Elephanta_Caves_Trimurti.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'mumbai-bandra-sea-link',
    destinationId: 'mumbai',
    destinationName: 'Mumbai',
    name: 'Bandra-Worli Sea Link & Siddhivinayak Temple',
    shortDescription: 'Cable-stayed engineering marvel spanning Mahim Bay, followed by Mumbai’s most revered Ganesh shrine.',
    detailedDescription: 'Drive across the 8-lane cable bridge with modern skyline views and visit Prabhadevi’s gold-plated sanctum of Lord Ganesha.',
    duration: '2 Hours',
    category: 'Modern Landmark & Temple',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Bandra%E2%80%93Worli_Sea_Link.jpg/1280px-Bandra%E2%80%93Worli_Sea_Link.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // GOA
  // ==========================================
  {
    id: 'goa-old-goa-churches',
    destinationId: 'goa',
    destinationName: 'Goa',
    name: 'Basilica of Bom Jesus & Se Cathedral (Old Goa)',
    shortDescription: 'UNESCO-listed Portuguese baroque churches enshrining the mortal remains of St. Francis Xavier.',
    detailedDescription: 'Masterpiece of 16th-century Manueline and Baroque architecture with carved gilded altars and the famous Se Cathedral bell.',
    duration: '2 Hours',
    category: 'UNESCO Heritage Cathedral',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'goa-calangute-baga',
    destinationId: 'goa',
    destinationName: 'Goa',
    name: 'Baga & Calangute Beach Watersports',
    shortDescription: 'Vibrant golden sand beach with parasailing, jet-skiing, banana rides, and seaside shacks.',
    detailedDescription: 'The heart of North Goa beach culture with exhilarating Arabian Sea water sports, fresh seafood shacks, and sunset beach vibes.',
    duration: '3 Hours',
    category: 'Beach & Watersports',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Sunset_at_Calangute.jpg/1280px-Sunset_at_Calangute.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'goa-dudhsagar',
    destinationId: 'goa',
    destinationName: 'Goa',
    name: 'Dudhsagar Waterfalls Jungle Jeep Safari',
    shortDescription: 'Four-tiered 310-meter cascading milky waterfall inside Bhagwan Mahavir Wildlife Sanctuary.',
    detailedDescription: 'Take an open 4x4 Jeep through jungle streams, swim in the freshwater plunge pool beneath the railway viaduct, and feed wild monkeys.',
    duration: '5 Hours',
    category: 'Waterfall Jungle Adventure',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Doodhsagar_Fall.jpg/1280px-Doodhsagar_Fall.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'goa-fort-aguada',
    destinationId: 'goa',
    destinationName: 'Goa',
    name: 'Fort Aguada & Lighthouse Sinquerim',
    shortDescription: '17th-century Portuguese coastal fortress and four-story lighthouse guarding the Mandovi River mouth.',
    detailedDescription: 'Once the grandest freshwater replenishment station for Portuguese naval ships, commanding sweeping views of the Arabian Sea.',
    duration: '1.5 Hours',
    category: 'Seaside Coastal Fortress',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Fort_aguada.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  },

  // ==========================================
  // KERALA
  // ==========================================
  {
    id: 'kerala-alleppey-houseboat',
    destinationId: 'kerala',
    destinationName: 'Kerala (Munnar & Alleppey)',
    name: 'Alleppey Backwaters Houseboat Day Cruise',
    shortDescription: 'Traditional thatched wooden Kettuvallam cruise through emerald canals, paddy fields, and lagoons.',
    detailedDescription: 'Glide peacefully along palm-fringed backwaters while enjoying freshly prepared authentic Kerala Karimeen fish and coconut curries onboard.',
    duration: '4 Hours',
    category: 'Backwater Houseboat Cruise',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/1280px-Alappuzha_Boat_Beauty_W.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'kerala-munnar-tea-gardens',
    destinationId: 'kerala',
    destinationName: 'Kerala (Munnar & Alleppey)',
    name: 'Munnar Tea Plantations & Tata Tea Museum',
    shortDescription: 'Rolling emerald tea estate walks, tea picking experience, and processing demonstration.',
    detailedDescription: 'Perched in the Western Ghats at 5,200 feet. Walk through manicured green tea gardens, visit Mattupetty Dam, and taste freshly brewed orthodox tea.',
    duration: '3 Hours',
    category: 'Hill Plantation Experience',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'kerala-periyar-wildlife',
    destinationId: 'kerala',
    destinationName: 'Kerala (Munnar & Alleppey)',
    name: 'Periyar Lake Wildlife Boat Safari (Thekkady)',
    shortDescription: 'Boat safari across artificial mountain lake spotting wild Asian elephants, gaur, and sambar deer.',
    detailedDescription: 'Located within Periyar Tiger Reserve in Cardamom Hills, surrounded by fragrant organic spice plantations of cardamom, pepper, and cinnamon.',
    duration: '2.5 Hours',
    category: 'Wildlife Lake Safari',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Periyar_National_Park.JPG/1280px-Periyar_National_Park.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'kerala-kochi-chinese-nets',
    destinationId: 'kerala',
    destinationName: 'Kerala (Munnar & Alleppey)',
    name: 'Fort Kochi Chinese Fishing Nets & Kathakali Performance',
    shortDescription: '14th-century cantilevered sea nets followed by an evening classical Kathakali dance and facial makeup show.',
    detailedDescription: 'Wander past Portuguese houses, Jewish Synagogue, and witness master artists narrate epic Ramayana tales through elaborate eye expressions and mudras.',
    duration: '3 Hours',
    category: 'Cultural Show & Heritage',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg/1280px-Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  }
,
  // ==========================================
  // DALHOUSIE
  // ==========================================
  {
    id: 'dalhousie-khajjiar',
    destinationId: 'dalhousie',
    destinationName: 'Dalhousie',
    name: 'Khajjiar Meadow (Mini Switzerland of India)',
    shortDescription: 'Emerald saucer-shaped meadow surrounded by dense deodar pine forests and a tranquil lake.',
    detailedDescription: 'Located 24 km from Dalhousie, featuring horse riding, zorbing, panoramic cedar trails, and the 12th-century Khajji Nag Temple.',
    duration: '3–4 Hours',
    category: 'Alpine Meadow',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Khajjiar.jpg/1280px-Khajjiar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'dalhousie-dainkund',
    destinationId: 'dalhousie',
    destinationName: 'Dalhousie',
    name: 'Dainkund Peak & Panchpula Waterfall',
    shortDescription: 'Highest peak in Dalhousie (9,000 ft) offering 360-degree views of snow-clad Pir Panjal ranges.',
    detailedDescription: 'A scenic ridge walk through whispering pines leading to the Pohlani Devi temple, followed by Panchpula memorial springs and waterfalls.',
    duration: '2.5 Hours',
    category: 'Panoramic Ridge & Springs',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nature_of_Khajjiar.jpg/1280px-Nature_of_Khajjiar.jpg'
  },

  // ==========================================
  // MCLEODGANJ
  // ==========================================
  {
    id: 'mcleodganj-tsuglagkhang',
    destinationId: 'mcleodganj',
    destinationName: 'McLeodGanj',
    name: 'Tsuglagkhang Dalai Lama Temple Complex',
    shortDescription: 'Spiritual heart of Tibetan Buddhism in exile, official temple residence of His Holiness Dalai Lama.',
    detailedDescription: 'Houses the main prayer hall with towering statues of Buddha Shakyamuni and Avalokiteshvara, Namgyal Monastery, and holy meditation Kora paths.',
    duration: '2 Hours',
    category: 'Buddhist Temple & Monastery',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw'
  },
  {
    id: 'mcleodganj-bhagsunag',
    destinationId: 'mcleodganj',
    destinationName: 'McLeodGanj',
    name: 'Bhagsunag Waterfall & Ancient Shiva Temple',
    shortDescription: 'Cascading mountain waterfall and freshwater natural spring pools surrounded by rocky cliffs.',
    detailedDescription: 'Pleasant 1 km stone-paved walk from Bhagsu village, featuring an ancient Lord Shiva temple, mountain cafes, and natural cool water pools.',
    duration: '1.5 Hours',
    category: 'Mountain Waterfall',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Bhagsu_view.jpg/1280px-Bhagsu_view.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // AYODHYA
  // ==========================================
  {
    id: 'ayodhya-ram-mandir',
    destinationId: 'ayodhya',
    destinationName: 'Ayodhya',
    name: 'Shree Ram Janmabhumi Temple',
    shortDescription: 'Grand Nagara-style pink sandstone temple marking the sacred birthplace of Lord Rama.',
    detailedDescription: 'Magnificent architectural masterpiece crafted from Bansi Paharpur stone with intricate carvings of deities, grand mandapas, and Ram Lalla sanctum.',
    duration: '2–3 Hours',
    category: 'Sacred Pilgrimage Temple',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/1280px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'ayodhya-hanuman-garhi',
    destinationId: 'ayodhya',
    destinationName: 'Ayodhya',
    name: 'Hanuman Garhi',
    shortDescription: '10th-century hilltop temple fortress with 76 steps, enshrining Lord Hanuman guarding Ayodhya.',
    detailedDescription: 'Revered temple custom dictates visiting Hanuman Garhi before worshipping at Ram Janmabhumi. Features circular ramparts and panoramic views over Ayodhya.',
    duration: '1 Hour',
    category: 'Historic Temple Fort',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Hanuman_Garhi_Temple%2C_a_major_religious_site_in_Ayodhya_utter_pradesh.jpg/1280px-Hanuman_Garhi_Temple%2C_a_major_religious_site_in_Ayodhya_utter_pradesh.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'ayodhya-ram-ki-paidi',
    destinationId: 'ayodhya',
    destinationName: 'Ayodhya',
    name: 'Ram Ki Paidi - Saryu River / Saryu Aarti',
    shortDescription: 'Sacred series of bathing ghats on the banks of Saryu River, illuminated during the evening Maha Aarti.',
    detailedDescription: 'Vibrant riverside promenade where thousands gather for sunset holy dips, synchronized chanting, and divine brass lamp river offerings.',
    duration: '1.5 Hours',
    category: 'Sacred Ghats & Aarti',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Sarayu_River_night_view%2C_Ayodhya_001.jpg/1280px-Sarayu_River_night_view%2C_Ayodhya_001.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // GAYA
  // ==========================================
  {
    id: 'gaya-vishnupad',
    destinationId: 'gaya',
    destinationName: 'Gaya',
    name: 'Vishnupad Temple',
    shortDescription: 'Ancient grey granite temple on Phalgu River enshrining the 40-cm footprint of Lord Vishnu.',
    detailedDescription: 'Built in 1787 by Queen Ahilyabai Holkar of Indore, recognized as one of Hinduism’s most holy spots for shraddha pind daan ancestral rites.',
    duration: '1.5 Hours',
    category: 'Ancient Shrine',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Vishnupad_Temple%2CUpdated.jpg/1280px-Vishnupad_Temple%2CUpdated.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'gaya-mangla-gauri',
    destinationId: 'gaya',
    destinationName: 'Gaya',
    name: 'Mangla Gauri Temple',
    shortDescription: '15th-century venerated Shakti Peetha shrine situated atop Bhasmakoot hill in Gaya.',
    detailedDescription: 'Mentioned in the Padma Purana as the spot where the breast of Sati fell, approached by stone staircase offering panoramic views.',
    duration: '1 Hour',
    category: 'Shakti Peetha Temple',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Mangala_Gauri_Temple_at_Gaya%2C_Bihar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  },

  // ==========================================
  // BODH GAYA
  // ==========================================
  {
    id: 'bodhgaya-mahabodhi',
    destinationId: 'bodh-gaya',
    destinationName: 'Bodh Gaya',
    name: 'Mahabodhi Temple',
    shortDescription: 'UNESCO World Heritage 50-meter pyramidal brick temple marking the site of Buddha’s supreme enlightenment.',
    detailedDescription: 'Dating back to the 5th–6th century CE, featuring the Vajrasana diamond throne, ancient votive stupas, and peaceful meditation courtyards.',
    duration: '2 Hours',
    category: 'UNESCO World Heritage',
    unesco: true,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/1280px-Mahabodhitemple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'bodhgaya-bodhi-tree',
    destinationId: 'bodh-gaya',
    destinationName: 'Bodh Gaya',
    name: 'Bodhi Tree',
    shortDescription: 'Direct descendant of the original fig tree under which Siddhartha Gautama meditated and became the Buddha in 528 BCE.',
    detailedDescription: 'Adjoining the western wall of Mahabodhi Temple, pilgrims from across the globe circumambulate and meditate beneath its shade.',
    duration: '1 Hour',
    category: 'Sacred Tree & Meditation',
    unesco: true,
    image: 'https://tricycle.org/wp-content/uploads/2019/04/bodhi-tree.jpg'
  },
  {
    id: 'bodhgaya-great-buddha',
    destinationId: 'bodh-gaya',
    destinationName: 'Bodh Gaya',
    name: 'Great Buddha Statue',
    shortDescription: 'Monumental 80-foot red granite and sandstone statue of Gautama Buddha seated in meditation dhyana mudra.',
    detailedDescription: 'Unveiled by the 14th Dalai Lama in 1989, flanked by ten standing disciples, making it one of the tallest Buddha statues in India.',
    duration: '45 Minutes',
    category: 'Colossal Monument',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Great_Buddha_Statue%2C_Bodh_Gaya_at_Sunset.jpg/1280px-Great_Buddha_Statue%2C_Bodh_Gaya_at_Sunset.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // CHITRAKOOT
  // ==========================================
  {
    id: 'chitrakoot-ramghat',
    destinationId: 'chitrakoot',
    destinationName: 'Chitrakoot',
    name: 'Ramghat',
    shortDescription: 'Sacred riverside bathing steps where Goswami Tulsidas had darshan of Lord Rama and Lakshmana.',
    detailedDescription: 'Tranquil evening venue for boat rides, traditional temple bells, and the spiritual Mandakini Aarti on the serene forest river.',
    duration: '1.5 Hours',
    category: 'Holy Ghat & River Aarti',
    unesco: false,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmWLux5g3HxIeP_P-PW_DMzTouOrmGTDoiZYngSR5Kl_00aDXyCJoZLwCb5Jws-OFhR8J_huvuLTGP5aNG2Oi14iuyihQ3r4PCMhJ0KNKecYhH1rYuL7H522LBbFy6XTiHjRC9p7a3Kjd6B=s1360-w1360-h1020-rw'
  },
  {
    id: 'chitrakoot-kamadgiri',
    destinationId: 'chitrakoot',
    destinationName: 'Chitrakoot',
    name: 'Kamadgiri Temple',
    shortDescription: 'Holy forested hill believed to embody the spirit of Lord Rama and fulfill heartfelt wishes.',
    detailedDescription: 'Devotees perform the sacred 5-kilometer parikrama circumnavigation around the wooded perimeter dotted with ancient shrines.',
    duration: '2 Hours',
    category: 'Sacred Parikrama Hill',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Government_Polytechnic_-_Bargarh_-_Chitrakoot_2014-07-06_7257.JPG/1280px-Government_Polytechnic_-_Bargarh_-_Chitrakoot_2014-07-06_7257.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // PRAYAGRAJ
  // ==========================================
  {
    id: 'prayagraj-sangam',
    destinationId: 'prayagraj',
    destinationName: 'Prayagraj',
    name: 'Triveni Sangam',
    shortDescription: 'Holy meeting point of the greenish Ganga, clear Yamuna, and mythical underground Saraswati.',
    detailedDescription: 'Vibrant hub of spiritual boat rides, migratory Siberian gulls in winter, and holy baths at the sacred epicentre of Kumbh Mela.',
    duration: '2 Hours',
    category: 'Holy Confluence',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/NorthIndiaCircuit_250.jpg/1280px-NorthIndiaCircuit_250.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'prayagraj-bade-hanuman',
    destinationId: 'prayagraj',
    destinationName: 'Prayagraj',
    name: 'Shri Bade Hanuman Ji Mandir',
    shortDescription: 'Revered subterranean temple near Sangam housing a unique 20-foot reclining idol of Lord Hanuman.',
    detailedDescription: 'Submerged every monsoon by rising Ganga waters considered the river’s touch of worship. Believed to bestow divine strength and blessings.',
    duration: '1 Hour',
    category: 'Subterranean Shrine',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Lete_Hanuman_Ji_Mandir.jpg/1280px-Lete_Hanuman_Ji_Mandir.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },

  // ==========================================
  // VARANASI EXTRA SIGHTS
  // ==========================================
  {
    id: 'varanasi-assi-ghat',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Assi Ghat',
    shortDescription: 'Southernmost sacred ghat at the confluence of Ganga and Assi, renowned for morning classical music.',
    detailedDescription: 'Famous for early dawn yoga, sunrise hawans, classical flute and sitar recitals, and relaxed riverside cafes.',
    duration: '1.5 Hours',
    category: 'Sacred Ghat',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Assi_Ghat_Varanasi_morning_Aarti.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  },
  {
    id: 'varanasi-sankat-mochan',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Sankat Mochan Hanuman Temple',
    shortDescription: 'Historic temple founded by Sant Tulsidas dedicated to Lord Hanuman, dispeller of all troubles.',
    detailedDescription: 'Surrounded by peaceful temple trees, renowned for its daily sweet besan laddoos and tranquil devotional atmosphere.',
    duration: '1 Hour',
    category: 'Devotional Shrine',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Sankat_Mochan_temple_entrance%2C_Varanasi_-_IRCTC_2017_%281%29.jpg/1280px-Sankat_Mochan_temple_entrance%2C_Varanasi_-_IRCTC_2017_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'varanasi-kaal-bhairav',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Kaal Bhairav Temple',
    shortDescription: 'Ancient temple of the fierce guardian protector deity and spiritual police chief of Varanasi.',
    detailedDescription: 'Pilgrims seek permission and blessings from Kaal Bhairav upon arriving in Kashi. Revered for centuries of tantric and Vedic heritage.',
    duration: '45 Minutes',
    category: 'Guardian Deity Temple',
    unesco: false,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Kaal_Bhairab%2C_Kathmandu%2C_Nepal.jpg/1280px-Kaal_Bhairab%2C_Kathmandu%2C_Nepal.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'varanasi-manikarnika',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    name: 'Manikarnika Ghat',
    shortDescription: 'The holiest burning ghat where the eternal sacred fire grants liberation (moksha) to souls.',
    detailedDescription: 'Deeply philosophical spiritual site on the Ganges where funeral pyres have burnt continuously for millennia, witnessed respectfully from boat cruises.',
    duration: '45 Minutes',
    category: 'Spiritual Ghat',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Manikarnika_Ghat%2C_Varanasi%2C_Uttar_Pradesh%2C_India_%282011%29_5.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled'
  }
];

// Helper: Common Driving Distances & Times between cities
export const INTERCITY_ROUTES: Record<string, { distanceKm: number; driveTime: string; routeVia?: string }> = {
  'delhi-agra': { distanceKm: 210, driveTime: '3.5–4 Hours', routeVia: 'Yamuna Expressway' },
  'agra-delhi': { distanceKm: 210, driveTime: '3.5–4 Hours', routeVia: 'Yamuna Expressway' },
  'agra-jaipur': { distanceKm: 240, driveTime: '4.5–5 Hours', routeVia: 'NH 21 via Fatehpur Sikri' },
  'jaipur-agra': { distanceKm: 240, driveTime: '4.5–5 Hours', routeVia: 'NH 21 via Bharatpur & Fatehpur Sikri' },
  'agra-fatehpur-sikri': { distanceKm: 38, driveTime: '50 Minutes', routeVia: 'Agra-Bikaner Highway' },
  'fatehpur-sikri-agra': { distanceKm: 38, driveTime: '50 Minutes', routeVia: 'Agra-Bikaner Highway' },
  'fatehpur-sikri-jaipur': { distanceKm: 205, driveTime: '3.5–4 Hours', routeVia: 'NH 21' },
  'jaipur-fatehpur-sikri': { distanceKm: 205, driveTime: '3.5–4 Hours', routeVia: 'NH 21' },
  'delhi-jaipur': { distanceKm: 270, driveTime: '4–4.5 Hours', routeVia: 'Delhi-Mumbai Expressway' },
  'jaipur-delhi': { distanceKm: 270, driveTime: '4–4.5 Hours', routeVia: 'Delhi-Mumbai Expressway' },
  'delhi-mathura-vrindavan': { distanceKm: 155, driveTime: '2.5 Hours', routeVia: 'Yamuna Expressway' },
  'mathura-vrindavan-delhi': { distanceKm: 155, driveTime: '2.5 Hours', routeVia: 'Yamuna Expressway' },
  'mathura-vrindavan-agra': { distanceKm: 60, driveTime: '1 Hour', routeVia: 'NH 19' },
  'agra-mathura-vrindavan': { distanceKm: 60, driveTime: '1 Hour', routeVia: 'NH 19' },
  'jaipur-jodhpur': { distanceKm: 330, driveTime: '5.5–6 Hours', routeVia: 'NH 25 via Ajmer' },
  'jodhpur-jaipur': { distanceKm: 330, driveTime: '5.5–6 Hours', routeVia: 'NH 25' },
  'jaipur-pushkar': { distanceKm: 145, driveTime: '2.5–3 Hours', routeVia: 'NH 48 via Kishangarh' },
  'pushkar-jaipur': { distanceKm: 145, driveTime: '2.5–3 Hours', routeVia: 'NH 48 via Kishangarh' },
  'pushkar-jodhpur': { distanceKm: 190, driveTime: '3.5 Hours', routeVia: 'NH 25' },
  'jodhpur-pushkar': { distanceKm: 190, driveTime: '3.5 Hours', routeVia: 'NH 25' },
  'jaipur-udaipur': { distanceKm: 395, driveTime: '6.5–7 Hours', routeVia: 'NH 48 via Chittorgarh' },
  'udaipur-jaipur': { distanceKm: 395, driveTime: '6.5–7 Hours', routeVia: 'NH 48 via Chittorgarh' },
  'jodhpur-udaipur': { distanceKm: 260, driveTime: '5 Hours', routeVia: 'Ranakpur Jain Temples' },
  'udaipur-jodhpur': { distanceKm: 260, driveTime: '5 Hours', routeVia: 'Ranakpur Jain Temples' },
  'jodhpur-jaisalmer': { distanceKm: 280, driveTime: '4.5–5 Hours', routeVia: 'NH 11' },
  'jaisalmer-jodhpur': { distanceKm: 280, driveTime: '4.5–5 Hours', routeVia: 'NH 11' },
  'jodhpur-bikaner': { distanceKm: 250, driveTime: '4.5 Hours', routeVia: 'NH 62' },
  'bikaner-jodhpur': { distanceKm: 250, driveTime: '4.5 Hours', routeVia: 'NH 62' },
  'jaipur-bikaner': { distanceKm: 335, driveTime: '5.5 Hours', routeVia: 'NH 52' },
  'bikaner-jaipur': { distanceKm: 335, driveTime: '5.5 Hours', routeVia: 'NH 52' },
  'bikaner-jaisalmer': { distanceKm: 330, driveTime: '5.5 Hours', routeVia: 'NH 11' },
  'jaisalmer-bikaner': { distanceKm: 330, driveTime: '5.5 Hours', routeVia: 'NH 11' },
  'jaipur-ranthambore': { distanceKm: 160, driveTime: '3 Hours', routeVia: 'Delhi-Mumbai Expressway' },
  'ranthambore-jaipur': { distanceKm: 160, driveTime: '3 Hours', routeVia: 'Delhi-Mumbai Expressway' },
  'delhi-amritsar': { distanceKm: 450, driveTime: '7–8 Hours', routeVia: 'NH 44 GT Road' },
  'amritsar-delhi': { distanceKm: 450, driveTime: '7–8 Hours', routeVia: 'NH 44 GT Road' },
  'delhi-shimla': { distanceKm: 345, driveTime: '7–7.5 Hours', routeVia: 'Himalayan Expressway' },
  'shimla-delhi': { distanceKm: 345, driveTime: '7–7.5 Hours', routeVia: 'Himalayan Expressway' },
  'shimla-manali': { distanceKm: 240, driveTime: '7–8 Hours', routeVia: 'NH 205' },
  'manali-shimla': { distanceKm: 240, driveTime: '7–8 Hours', routeVia: 'NH 205' },
  'manali-dharamshala': { distanceKm: 215, driveTime: '6.5 Hours', routeVia: 'NH 154' },
  'dharamshala-manali': { distanceKm: 215, driveTime: '6.5 Hours', routeVia: 'NH 154' },
  'dharamshala-amritsar': { distanceKm: 200, driveTime: '4.5 Hours', routeVia: 'Pathankot' },
  'amritsar-dharamshala': { distanceKm: 200, driveTime: '4.5 Hours', routeVia: 'Pathankot' },
  'delhi-rishikesh': { distanceKm: 235, driveTime: '4.5–5 Hours', routeVia: 'Delhi-Dehradun Expressway' },
  'rishikesh-delhi': { distanceKm: 235, driveTime: '4.5–5 Hours', routeVia: 'Delhi-Dehradun Expressway' },
  'haridwar-rishikesh': { distanceKm: 25, driveTime: '40 Minutes', routeVia: 'Haridwar-Rishikesh Highway' },
  'rishikesh-haridwar': { distanceKm: 25, driveTime: '40 Minutes', routeVia: 'Haridwar-Rishikesh Highway' },
  'delhi-haridwar': { distanceKm: 215, driveTime: '4 Hours', routeVia: 'Upper Ganga Canal Expressway' },
  'haridwar-delhi': { distanceKm: 215, driveTime: '4 Hours', routeVia: 'Upper Ganga Canal Expressway' },
  'srinagar-gulmarg': { distanceKm: 50, driveTime: '1.5 Hours', routeVia: 'Narbal-Gulmarg Road' },
  'gulmarg-srinagar': { distanceKm: 50, driveTime: '1.5 Hours', routeVia: 'Narbal-Gulmarg Road' },
  'srinagar-pahalgam': { distanceKm: 90, driveTime: '2.5 Hours', routeVia: 'Saffron Fields of Pampore & Avantipur' },
  'pahalgam-srinagar': { distanceKm: 90, driveTime: '2.5 Hours', routeVia: 'Saffron Fields of Pampore & Avantipur' },
  'pahalgam-gulmarg': { distanceKm: 140, driveTime: '3.5 Hours', routeVia: 'Srinagar Bypass' },
  'gulmarg-pahalgam': { distanceKm: 140, driveTime: '3.5 Hours', routeVia: 'Srinagar Bypass' },
  'agra-bharatpur': { distanceKm: 55, driveTime: '1 Hour', routeVia: 'NH 21' },
  'bharatpur-agra': { distanceKm: 55, driveTime: '1 Hour', routeVia: 'NH 21' },
  'bharatpur-jaipur': { distanceKm: 185, driveTime: '3.5 Hours', routeVia: 'NH 21' },
  'jaipur-bharatpur': { distanceKm: 185, driveTime: '3.5 Hours', routeVia: 'NH 21' },
  'mumbai-goa': { distanceKm: 590, driveTime: '10–11 Hours', routeVia: 'Mumbai-Goa Coastal Highway NH 66' }
};

export interface CoverImagePreset {
  id: string;
  name: string;
  destination: string;
  url: string;
  unesco?: boolean;
}

export const FEATURED_COVER_PRESETS: CoverImagePreset[] = [
  {
    id: 'cov-taj',
    name: 'Taj Mahal at Sunrise',
    destination: 'Agra',
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    unesco: true
  },
  {
    id: 'cov-india-gate',
    name: 'India Gate & Rajpath',
    destination: 'Delhi',
    url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-qutub',
    name: 'Qutub Minar Victory Tower',
    destination: 'Delhi',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    unesco: true
  },
  {
    id: 'cov-amber',
    name: 'Amber Fort & Maota Lake',
    destination: 'Jaipur',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    unesco: true
  },
  {
    id: 'cov-hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    destination: 'Jaipur',
    url: 'https://images.unsplash.com/photo-1609137144822-26d9c6c21e35?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-udaipur',
    name: 'City Palace & Lake Pichola',
    destination: 'Udaipur',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-golden-temple',
    name: 'Harmandir Sahib (Golden Temple)',
    destination: 'Amritsar',
    url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-kerala',
    name: 'Alleppey Backwaters & Houseboat',
    destination: 'Kerala',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-dal-lake',
    name: 'Dal Lake Houseboats & Shikara',
    destination: 'Srinagar, Kashmir',
    url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-gateway',
    name: 'Gateway of India',
    destination: 'Mumbai',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80'
  }
];

// ==========================================
// HARDCODED ATTRACTION IMAGE OVERRIDES
// Explicitly mapped verified Unsplash imagery for core sights
// ==========================================
export const ATTRACTION_IMAGE_OVERRIDES: Record<string, string> = {
  // Delhi
  'delhi-qutub': 'https://plus.unsplash.com/premium_photo-1697729438410-d53c666e3810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D',
  'qutub minar': 'https://plus.unsplash.com/premium_photo-1697729438410-d53c666e3810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D',
  'qutub minar complex': 'https://plus.unsplash.com/premium_photo-1697729438410-d53c666e3810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D',
  'qutub minar victory tower': 'https://plus.unsplash.com/premium_photo-1697729438410-d53c666e3810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D',

  'delhi-humayun': 'https://images.unsplash.com/photo-1609670289875-590e8ec05c88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYXl1biVFMiU4MCU5OXMlMjB0b21ifGVufDB8fDB8fHww',
  "humayun's tomb": 'https://images.unsplash.com/photo-1609670289875-590e8ec05c88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYXl1biVFMiU4MCU5OXMlMjB0b21ifGVufDB8fDB8fHww',
  "humayun’s tomb": 'https://images.unsplash.com/photo-1609670289875-590e8ec05c88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYXl1biVFMiU4MCU5OXMlMjB0b21ifGVufDB8fDB8fHww',

  'delhi-india-gate': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW5kaWElMjBnYXRlfGVufDB8fDB8fHww',
  'india gate': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW5kaWElMjBnYXRlfGVufDB8fDB8fHww',
  'india gate & kartavya path': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW5kaWElMjBnYXRlfGVufDB8fDB8fHww',

  'delhi-red-fort': 'https://images.unsplash.com/photo-1705524220939-dac17cf94236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVkJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D',
  'red fort': 'https://images.unsplash.com/photo-1705524220939-dac17cf94236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVkJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D',
  'red fort (lal qila)': 'https://images.unsplash.com/photo-1705524220939-dac17cf94236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVkJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D',

  'delhi-lotus': 'https://images.unsplash.com/photo-1688257899811-d96d969416bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TG90dXMlMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D',
  'lotus temple': 'https://images.unsplash.com/photo-1688257899811-d96d969416bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TG90dXMlMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D',
  'lotus temple (baháʼí house of worship)': 'https://images.unsplash.com/photo-1688257899811-d96d969416bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TG90dXMlMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D',

  'delhi-akshardham': 'https://images.unsplash.com/photo-1789606565427-ce5b3749bf6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN3YW1pbmFyYXlhbiUyMEFrc2hhcmRoYW0lMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D',
  'akshardham temple': 'https://images.unsplash.com/photo-1789606565427-ce5b3749bf6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN3YW1pbmFyYXlhbiUyMEFrc2hhcmRoYW0lMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D',
  'swaminarayan akshardham temple': 'https://images.unsplash.com/photo-1789606565427-ce5b3749bf6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN3YW1pbmFyYXlhbiUyMEFrc2hhcmRoYW0lMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D',
  'swaminarayana akshardham temaple': 'https://images.unsplash.com/photo-1789606565427-ce5b3749bf6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN3YW1pbmFyYXlhbiUyMEFrc2hhcmRoYW0lMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D',

  'delhi-chandni-chowk': 'https://images.unsplash.com/photo-1662103086938-f57fbb0689a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmRuaSUyMGNob3drfGVufDB8fDB8fHww',
  'chandni chowk': 'https://images.unsplash.com/photo-1662103086938-f57fbb0689a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmRuaSUyMGNob3drfGVufDB8fDB8fHww',
  'chandni chowk & old delhi rickshaw tour': 'https://images.unsplash.com/photo-1662103086938-f57fbb0689a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmRuaSUyMGNob3drfGVufDB8fDB8fHww',

  'delhi-jama-masjid': 'https://images.unsplash.com/photo-1637301625903-e25a30ba1bb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFtYSUyME1hc2ppZHxlbnwwfHwwfHx8MA%3D%3D',
  'jama masjid': 'https://images.unsplash.com/photo-1637301625903-e25a30ba1bb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFtYSUyME1hc2ppZHxlbnwwfHwwfHx8MA%3D%3D',

  'delhi-raj-ghat': 'https://media.istockphoto.com/id/2259603090/photo/raj-ghat-mahatma-gandhi-memorial-in-delhi.webp?a=1&b=1&s=612x612&w=0&k=20&c=AQCqIo-KQAZH-dIOmLMfBMzuLbnQc-vPryEuq-2zm5A=',
  'raj ghat': 'https://media.istockphoto.com/id/2259603090/photo/raj-ghat-mahatma-gandhi-memorial-in-delhi.webp?a=1&b=1&s=612x612&w=0&k=20&c=AQCqIo-KQAZH-dIOmLMfBMzuLbnQc-vPryEuq-2zm5A=',
  'raj ghat (mahatma gandhi memorial)': 'https://media.istockphoto.com/id/2259603090/photo/raj-ghat-mahatma-gandhi-memorial-in-delhi.webp?a=1&b=1&s=612x612&w=0&k=20&c=AQCqIo-KQAZH-dIOmLMfBMzuLbnQc-vPryEuq-2zm5A=',

  // Agra
  'agra-sikandra': 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D',
  "akbar's tomb": 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D',
  "akbar’s tomb": 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D',
  "akbar's tomb at sikandra": 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D',
  "akbar’s tomb at sikandra": 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D',
  'sikandra': 'https://plus.unsplash.com/premium_photo-1697730554395-4a79dfd66ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtiYXJzJTIwdG9tYnxlbnwwfHwwfHx8MA%3D%3D',

  'agra-mehtab-bagh': 'https://images.unsplash.com/photo-1524491887412-14c265900364?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'mehtab bagh': 'https://images.unsplash.com/photo-1524491887412-14c265900364?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'mehtab bhag': 'https://images.unsplash.com/photo-1524491887412-14c265900364?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'mehtab bagh (moonlight garden sunset taj view)': 'https://images.unsplash.com/photo-1524491887412-14c265900364?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'agra-fort': 'https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWdyYSUyMEZPcnR8ZW58MHx8MHx8fDA%3D',
  'agra fort': 'https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWdyYSUyMEZPcnR8ZW58MHx8MHx8fDA%3D',
  'agra fort (lal qila of agra)': 'https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWdyYSUyMEZPcnR8ZW58MHx8MHx8fDA%3D',

  'agra-akbar-church': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Agra%2C_Akbar%27s_church.JPG',
  "akbar's church": 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Agra%2C_Akbar%27s_church.JPG',
  "akbar’s church": 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Agra%2C_Akbar%27s_church.JPG',
  'church of akbar': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Agra%2C_Akbar%27s_church.JPG',

  // Fatehpur Sikri
  'fs-buland-darwaza': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',
  'buland darwaza': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',
  'buland darwaza & sheikh salim chishti shrine': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',

  'fs-panch-mahal': 'https://images.unsplash.com/photo-1742303300027-a4c32eafe389?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'panch mahal': 'https://images.unsplash.com/photo-1742303300027-a4c32eafe389?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'fs-jodha-bai-palace': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',
  "jodha bai's palace": 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',
  "joda bai's palace": 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',
  "jodha bai palace": 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',

  'fs-diwan-i-khas': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Diwan-i-khas%2C_Red_fort.jpg/500px-Diwan-i-khas%2C_Red_fort.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
  'diwan-i-khas': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Diwan-i-khas%2C_Red_fort.jpg/500px-Diwan-i-khas%2C_Red_fort.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
  'diwan-i-khas (hall of private audience)': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Diwan-i-khas%2C_Red_fort.jpg/500px-Diwan-i-khas%2C_Red_fort.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',

  // Jaipur
  'jaipur-amber-fort': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SPfXHdnTWBP2oV0EiqBGvNHxAX1igMpefVhT90f0lRqcFmGdsDWcFmQQbi8hWXGb3Hfpg9pdR3QW-uJuNUsxMI5leYlVIk2NNSn4a-XspAu95qMFK2gLMtT1Kef5wU274R6eLOig=s1360-w1360-h1020-rw',
  'amber fort': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SPfXHdnTWBP2oV0EiqBGvNHxAX1igMpefVhT90f0lRqcFmGdsDWcFmQQbi8hWXGb3Hfpg9pdR3QW-uJuNUsxMI5leYlVIk2NNSn4a-XspAu95qMFK2gLMtT1Kef5wU274R6eLOig=s1360-w1360-h1020-rw',
  'amer fort': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SPfXHdnTWBP2oV0EiqBGvNHxAX1igMpefVhT90f0lRqcFmGdsDWcFmQQbi8hWXGb3Hfpg9pdR3QW-uJuNUsxMI5leYlVIk2NNSn4a-XspAu95qMFK2gLMtT1Kef5wU274R6eLOig=s1360-w1360-h1020-rw',
  'amber fort & palace (amer fort)': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SPfXHdnTWBP2oV0EiqBGvNHxAX1igMpefVhT90f0lRqcFmGdsDWcFmQQbi8hWXGb3Hfpg9pdR3QW-uJuNUsxMI5leYlVIk2NNSn4a-XspAu95qMFK2gLMtT1Kef5wU274R6eLOig=s1360-w1360-h1020-rw',

  'jaipur-hawa-mahal': 'https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGF3YSUyME1haGFsfGVufDB8fDB8fHww',
  'hawa mahal': 'https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGF3YSUyME1haGFsfGVufDB8fDB8fHww',
  'hawa mahal (palace of winds)': 'https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGF3YSUyME1haGFsfGVufDB8fDB8fHww',

  'jaipur-city-palace': 'https://images.unsplash.com/photo-1667099639128-4b10f464f4a2?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'city palace': 'https://images.unsplash.com/photo-1667099639128-4b10f464f4a2?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'city palace, jaipur': 'https://images.unsplash.com/photo-1667099639128-4b10f464f4a2?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'jaipur-jantar-mantar': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SkLoAORvEfBzaIrspss0xXVmah3tZloWSAKP-RVkrGLx43IiEDuLaVHBakwAO3MJ2aoHxu9IdYcC2WnogCwXW0acxUQUZobkjiABl4BXPo_Nqvq3yjFbF4UBxQjHEbEO71fHYSSw=s1360-w1360-h1020-rw',
  'jantar mantar': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SkLoAORvEfBzaIrspss0xXVmah3tZloWSAKP-RVkrGLx43IiEDuLaVHBakwAO3MJ2aoHxu9IdYcC2WnogCwXW0acxUQUZobkjiABl4BXPo_Nqvq3yjFbF4UBxQjHEbEO71fHYSSw=s1360-w1360-h1020-rw',
  'jantar mantar astronomical observatory': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SkLoAORvEfBzaIrspss0xXVmah3tZloWSAKP-RVkrGLx43IiEDuLaVHBakwAO3MJ2aoHxu9IdYcC2WnogCwXW0acxUQUZobkjiABl4BXPo_Nqvq3yjFbF4UBxQjHEbEO71fHYSSw=s1360-w1360-h1020-rw',

  'jaipur-nahargarh': 'https://images.unsplash.com/photo-1591284080149-58e039950b29?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'nahargarh fort': 'https://images.unsplash.com/photo-1591284080149-58e039950b29?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'nahargarh fort & sunset viewpoint': 'https://images.unsplash.com/photo-1591284080149-58e039950b29?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'jaipur-chokhi-dhani': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tyu7surSw6HkZ3Vwas2iSMdNL5QmRLktxTRN5rFp3w9tu9Yvh3wCglg4X2DMznzO3nQB6PAwAZLJn4GLI2BzjTnDMmCY72mgsCuqaAtRfhYzkm3XYvJoFhS43bt1k7R-Vm2EvS0VFf_fM=s1360-w1360-h1020-rw',
  'choki dhani': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tyu7surSw6HkZ3Vwas2iSMdNL5QmRLktxTRN5rFp3w9tu9Yvh3wCglg4X2DMznzO3nQB6PAwAZLJn4GLI2BzjTnDMmCY72mgsCuqaAtRfhYzkm3XYvJoFhS43bt1k7R-Vm2EvS0VFf_fM=s1360-w1360-h1020-rw',
  'chokhi dhani': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tyu7surSw6HkZ3Vwas2iSMdNL5QmRLktxTRN5rFp3w9tu9Yvh3wCglg4X2DMznzO3nQB6PAwAZLJn4GLI2BzjTnDMmCY72mgsCuqaAtRfhYzkm3XYvJoFhS43bt1k7R-Vm2EvS0VFf_fM=s1360-w1360-h1020-rw',
  'chokhi dhani ethnic cultural village': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tyu7surSw6HkZ3Vwas2iSMdNL5QmRLktxTRN5rFp3w9tu9Yvh3wCglg4X2DMznzO3nQB6PAwAZLJn4GLI2BzjTnDMmCY72mgsCuqaAtRfhYzkm3XYvJoFhS43bt1k7R-Vm2EvS0VFf_fM=s1360-w1360-h1020-rw',

  'jaipur-patrika-gate': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TQn-LJrHPGp2eXgMz1_Np4CE7oD9ozDUYkH91Na8f5LXXu-00uCwULxT2ENFlgp0JAmiF4-3s59FUhACEO5wB6rsB56RYQKlnle_joR9O1stIYNXAuRfTKcL7hLHMM9-dlla85qw=s1360-w1360-h1020-rw',
  'patrika gate': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TQn-LJrHPGp2eXgMz1_Np4CE7oD9ozDUYkH91Na8f5LXXu-00uCwULxT2ENFlgp0JAmiF4-3s59FUhACEO5wB6rsB56RYQKlnle_joR9O1stIYNXAuRfTKcL7hLHMM9-dlla85qw=s1360-w1360-h1020-rw',
  'albert hall museum': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TQn-LJrHPGp2eXgMz1_Np4CE7oD9ozDUYkH91Na8f5LXXu-00uCwULxT2ENFlgp0JAmiF4-3s59FUhACEO5wB6rsB56RYQKlnle_joR9O1stIYNXAuRfTKcL7hLHMM9-dlla85qw=s1360-w1360-h1020-rw',
  'patrika gate & albert hall museum': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TQn-LJrHPGp2eXgMz1_Np4CE7oD9ozDUYkH91Na8f5LXXu-00uCwULxT2ENFlgp0JAmiF4-3s59FUhACEO5wB6rsB56RYQKlnle_joR9O1stIYNXAuRfTKcL7hLHMM9-dlla85qw=s1360-w1360-h1020-rw',

  // Mathura / Vrindavan
  'mv-janmabhoomi': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk8-sHd4nTDKjYbAeLbJvkPnQRR-fxv6SCb_FlLzTGrr6XiY-NJA-GULMGoPcQgTYvLlaQLbUe76pT341sVv7BvadxvbjsB6QRh-XoDVHQitDF_0gcs3RbXYxIYAqrNp_PLR_Hlhw=s1360-w1360-h1020-rw',
  'shri krishna janmabhoomi temple': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk8-sHd4nTDKjYbAeLbJvkPnQRR-fxv6SCb_FlLzTGrr6XiY-NJA-GULMGoPcQgTYvLlaQLbUe76pT341sVv7BvadxvbjsB6QRh-XoDVHQitDF_0gcs3RbXYxIYAqrNp_PLR_Hlhw=s1360-w1360-h1020-rw',
  'krishna janmabhoomi': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk8-sHd4nTDKjYbAeLbJvkPnQRR-fxv6SCb_FlLzTGrr6XiY-NJA-GULMGoPcQgTYvLlaQLbUe76pT341sVv7BvadxvbjsB6QRh-XoDVHQitDF_0gcs3RbXYxIYAqrNp_PLR_Hlhw=s1360-w1360-h1020-rw',

  'mv-prem-mandir': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QajfI5eVs5fkc7omNMPyfF_jyRnInDGcPEW6P7lyDo7rq0stRMZyqPTeXQF0kEh2ug6rZwrTVs4_SyWHXGDPP18fFF-g18wDsC4s40BDj0x1LOuX9XulovYS_znKQuWhm25De8F22p5a-k=s1360-w1360-h1020-rw',
  'prem mandir': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QajfI5eVs5fkc7omNMPyfF_jyRnInDGcPEW6P7lyDo7rq0stRMZyqPTeXQF0kEh2ug6rZwrTVs4_SyWHXGDPP18fFF-g18wDsC4s40BDj0x1LOuX9XulovYS_znKQuWhm25De8F22p5a-k=s1360-w1360-h1020-rw',
  'prem mandir vrindavan': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QajfI5eVs5fkc7omNMPyfF_jyRnInDGcPEW6P7lyDo7rq0stRMZyqPTeXQF0kEh2ug6rZwrTVs4_SyWHXGDPP18fFF-g18wDsC4s40BDj0x1LOuX9XulovYS_znKQuWhm25De8F22p5a-k=s1360-w1360-h1020-rw',

  'mv-banke-bihari': 'https://images.unsplash.com/photo-1655885333110-22b955d35667?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFua2UlMjBCaWhhcmklMjBUZW1wbGUlMjBWcmluZGF2YW58ZW58MHx8MHx8fDA%3D',
  'banke bihari': 'https://images.unsplash.com/photo-1655885333110-22b955d35667?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFua2UlMjBCaWhhcmklMjBUZW1wbGUlMjBWcmluZGF2YW58ZW58MHx8MHx8fDA%3D',
  'banke bihari temple': 'https://images.unsplash.com/photo-1655885333110-22b955d35667?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFua2UlMjBCaWhhcmklMjBUZW1wbGUlMjBWcmluZGF2YW58ZW58MHx8MHx8fDA%3D',
  'banke bihari temple vrindavan': 'https://images.unsplash.com/photo-1655885333110-22b955d35667?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFua2UlMjBCaWhhcmklMjBUZW1wbGUlMjBWcmluZGF2YW58ZW58MHx8MHx8fDA%3D',

  'mv-iskcon': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T6TZyvHDRvkewNYCHeUg9BG_z8CqfkUgZgNyo_AhPgjzYSgQyd_PcBr9-WLTqqa0djVodcvFiHIocHIl4ZcyOYmEg-sHBiaCvXkWvV9zDORewpzJHWFDGwOe8zNffKM0dgO_qM=s1360-w1360-h1020-rw',
  'iskcon': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T6TZyvHDRvkewNYCHeUg9BG_z8CqfkUgZgNyo_AhPgjzYSgQyd_PcBr9-WLTqqa0djVodcvFiHIocHIl4ZcyOYmEg-sHBiaCvXkWvV9zDORewpzJHWFDGwOe8zNffKM0dgO_qM=s1360-w1360-h1020-rw',
  'iskcon temple': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T6TZyvHDRvkewNYCHeUg9BG_z8CqfkUgZgNyo_AhPgjzYSgQyd_PcBr9-WLTqqa0djVodcvFiHIocHIl4ZcyOYmEg-sHBiaCvXkWvV9zDORewpzJHWFDGwOe8zNffKM0dgO_qM=s1360-w1360-h1020-rw',
  'iskcon krishna balaram temple': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T6TZyvHDRvkewNYCHeUg9BG_z8CqfkUgZgNyo_AhPgjzYSgQyd_PcBr9-WLTqqa0djVodcvFiHIocHIl4ZcyOYmEg-sHBiaCvXkWvV9zDORewpzJHWFDGwOe8zNffKM0dgO_qM=s1360-w1360-h1020-rw',

  // Jodhpur
  'jodhpur-jaswant-thada': 'https://images.unsplash.com/photo-1647946411346-f5d403d483c4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'jaswant thada': 'https://images.unsplash.com/photo-1647946411346-f5d403d483c4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'jaswant thada (taj of marwar)': 'https://images.unsplash.com/photo-1647946411346-f5d403d483c4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'jodhpur-mehrangarh': 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'mehrangarh fort': 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'jodhpur-umaid-bhawan': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sj-w4RD4SnjHWC0G3-vAuMQxBnoAjRrTExA4q-SqR1OFfRmcAaI87yL_Ndr5cBZXCX_FbbsKQUxGkDAxPMYkpRN3Z6b27G5xAYOQqiZQQsLgco8rLhWV5k4hZ1kYMDhcoauNyW=s1360-w1360-h1020-rw',
  'umaid bhawan palace': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sj-w4RD4SnjHWC0G3-vAuMQxBnoAjRrTExA4q-SqR1OFfRmcAaI87yL_Ndr5cBZXCX_FbbsKQUxGkDAxPMYkpRN3Z6b27G5xAYOQqiZQQsLgco8rLhWV5k4hZ1kYMDhcoauNyW=s1360-w1360-h1020-rw',
  'umaid bhawan palace & heritage museum': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sj-w4RD4SnjHWC0G3-vAuMQxBnoAjRrTExA4q-SqR1OFfRmcAaI87yL_Ndr5cBZXCX_FbbsKQUxGkDAxPMYkpRN3Z6b27G5xAYOQqiZQQsLgco8rLhWV5k4hZ1kYMDhcoauNyW=s1360-w1360-h1020-rw',

  'jodhpur-mandore': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SZYe8_ImySEQTHZeKzRZp6qhhgcAQHfBFKPSdoGORzYj588AFcGDBoOtb0YhlXxmc8SWjIrgVUJ8n9j_lBL39r9zV8lxACM-efkKncYZ4vGg7mm5BjJ5RCAAqxsj6r3TCvcsE=s1360-w1360-h1020-rw',
  'mandore gardens': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SZYe8_ImySEQTHZeKzRZp6qhhgcAQHfBFKPSdoGORzYj588AFcGDBoOtb0YhlXxmc8SWjIrgVUJ8n9j_lBL39r9zV8lxACM-efkKncYZ4vGg7mm5BjJ5RCAAqxsj6r3TCvcsE=s1360-w1360-h1020-rw',
  'mandore gardens & royal cenotaphs': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SZYe8_ImySEQTHZeKzRZp6qhhgcAQHfBFKPSdoGORzYj588AFcGDBoOtb0YhlXxmc8SWjIrgVUJ8n9j_lBL39r9zV8lxACM-efkKncYZ4vGg7mm5BjJ5RCAAqxsj6r3TCvcsE=s1360-w1360-h1020-rw',

  'jodhpur-blue-city-walk': 'https://images.unsplash.com/photo-1759250452033-0648324d97b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
  'blue city': 'https://images.unsplash.com/photo-1759250452033-0648324d97b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
  'blue city walking tour': 'https://images.unsplash.com/photo-1759250452033-0648324d97b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
  'blue city walking tour & clock tower bazaar': 'https://images.unsplash.com/photo-1759250452033-0648324d97b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',

  // Udaipur
  'udaipur-city-palace': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QfwKuIWmtX4czfGDD1VnxGvXM-6aAq-XCl5peRVQRbpSkvUQywYj-pefJBtOsgZQ1p22TCO2NevlIWFm99YkoUSoIYMQkTK9BjfTddvtWguJ8cS4oSyvhH0ECLKFWFNyXcdDmi=s1360-w1360-h1020-rw',
  'city palace complex & crystal gallery': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QfwKuIWmtX4czfGDD1VnxGvXM-6aAq-XCl5peRVQRbpSkvUQywYj-pefJBtOsgZQ1p22TCO2NevlIWFm99YkoUSoIYMQkTK9BjfTddvtWguJ8cS4oSyvhH0ECLKFWFNyXcdDmi=s1360-w1360-h1020-rw',

  'udaipur-saheliyon-ki-bari': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlS7NNbcXcKlK1UTEa4ibWy39inwgBfYjAz59kvDaJ_liVTlGth-vDgya3N9UMff7FRXlHJ0OaDRnt6_v0H2NhKSRXgZ8Z1nItCp6hlunVVsAbFlorFx5SESN-CcP_bzDcKM27ws5YLmYzF=s1360-w1360-h1020-rw',
  'saheliyon-ki-bari': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlS7NNbcXcKlK1UTEa4ibWy39inwgBfYjAz59kvDaJ_liVTlGth-vDgya3N9UMff7FRXlHJ0OaDRnt6_v0H2NhKSRXgZ8Z1nItCp6hlunVVsAbFlorFx5SESN-CcP_bzDcKM27ws5YLmYzF=s1360-w1360-h1020-rw',
  'saheliyon-ki-bari (courtyard of maidens)': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlS7NNbcXcKlK1UTEa4ibWy39inwgBfYjAz59kvDaJ_liVTlGth-vDgya3N9UMff7FRXlHJ0OaDRnt6_v0H2NhKSRXgZ8Z1nItCp6hlunVVsAbFlorFx5SESN-CcP_bzDcKM27ws5YLmYzF=s1360-w1360-h1020-rw',

  'udaipur-bagore-ki-haveli': 'https://images.unsplash.com/photo-1722080711528-095791cd14d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnb3JlJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D',
  'bagore ki haveli': 'https://images.unsplash.com/photo-1722080711528-095791cd14d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnb3JlJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D',
  'bagore ki haveli & dharohar folk dance show': 'https://images.unsplash.com/photo-1722080711528-095791cd14d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnb3JlJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D',

  'udaipur-monsoon-palace': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmuKHCm07tTvi_kQoSkxhTXysc422UarmQpl8ndRum8I_CHihe58mPmXhP8nfDnD_EG0c2rc7KddYfbL9H-N-U3_9rKH2rM534w9NycjfuNg_emOJsenNTkFKAcKro3Tt9l5AA-2g=s1360-w1360-h1020-rw',
  'monsoon palace': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmuKHCm07tTvi_kQoSkxhTXysc422UarmQpl8ndRum8I_CHihe58mPmXhP8nfDnD_EG0c2rc7KddYfbL9H-N-U3_9rKH2rM534w9NycjfuNg_emOJsenNTkFKAcKro3Tt9l5AA-2g=s1360-w1360-h1020-rw',
  'sajjangarh monsoon palace sunset lookout': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmuKHCm07tTvi_kQoSkxhTXysc422UarmQpl8ndRum8I_CHihe58mPmXhP8nfDnD_EG0c2rc7KddYfbL9H-N-U3_9rKH2rM534w9NycjfuNg_emOJsenNTkFKAcKro3Tt9l5AA-2g=s1360-w1360-h1020-rw',

  // Shimla
  'shimla-ridge-mall': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/960px-The_Ridge_Shimla_5.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  'the ridge': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/960px-The_Ridge_Shimla_5.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  'mall road': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/960px-The_Ridge_Shimla_5.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  'the ridge & mall road walking tour': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/960px-The_Ridge_Shimla_5.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail',

  'shimla-kufri': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl64eckwYYzIMR5lbqXGYdHSKT1uDPI6yoADwvUifsS5RgOoZzRmW2OuP4-bE4XGSplGIEP0yEqKy7zgfv9xTqzEraQt8VwjI1Raya8o4UbLOypj-d_1mjPXlPFi-RqNZ8raUdluw=s1360-w1360-h1020-rw',
  'kufri': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl64eckwYYzIMR5lbqXGYdHSKT1uDPI6yoADwvUifsS5RgOoZzRmW2OuP4-bE4XGSplGIEP0yEqKy7zgfv9xTqzEraQt8VwjI1Raya8o4UbLOypj-d_1mjPXlPFi-RqNZ8raUdluw=s1360-w1360-h1020-rw',
  'kufri adventure park': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl64eckwYYzIMR5lbqXGYdHSKT1uDPI6yoADwvUifsS5RgOoZzRmW2OuP4-bE4XGSplGIEP0yEqKy7zgfv9xTqzEraQt8VwjI1Raya8o4UbLOypj-d_1mjPXlPFi-RqNZ8raUdluw=s1360-w1360-h1020-rw',
  'kufri adventure park & snow viewpoint': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl64eckwYYzIMR5lbqXGYdHSKT1uDPI6yoADwvUifsS5RgOoZzRmW2OuP4-bE4XGSplGIEP0yEqKy7zgfv9xTqzEraQt8VwjI1Raya8o4UbLOypj-d_1mjPXlPFi-RqNZ8raUdluw=s1360-w1360-h1020-rw',

  'shimla-jakhoo-temple': 'https://www.thestatesman.com/wp-content/uploads/2023/04/5D59F9E7-7572-40E1-A9E8-779237EA23BB.jpeg',
  'jakhoo temple': 'https://www.thestatesman.com/wp-content/uploads/2023/04/5D59F9E7-7572-40E1-A9E8-779237EA23BB.jpeg',
  'jakhoo temple & aerial ropeway': 'https://www.thestatesman.com/wp-content/uploads/2023/04/5D59F9E7-7572-40E1-A9E8-779237EA23BB.jpeg',

  'shimla-viceregal-lodge': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SXtRMzSBImxKU_USO2dDejbTYtw7rGykDdZl3A8G9OlGEP6L27fr9IILEN69ZK3H7S4UmOam-rALD5UHfw5H3WfWNeG9R7uAzJnVjLj8TwkI2JhqsHUiOccWdP0X2LRDo3YbMT=s1360-w1360-h1020-rw',
  'viceregal lodge': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SXtRMzSBImxKU_USO2dDejbTYtw7rGykDdZl3A8G9OlGEP6L27fr9IILEN69ZK3H7S4UmOam-rALD5UHfw5H3WfWNeG9R7uAzJnVjLj8TwkI2JhqsHUiOccWdP0X2LRDo3YbMT=s1360-w1360-h1020-rw',
  'viceregal lodge (rashtrapati niwas)': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SXtRMzSBImxKU_USO2dDejbTYtw7rGykDdZl3A8G9OlGEP6L27fr9IILEN69ZK3H7S4UmOam-rALD5UHfw5H3WfWNeG9R7uAzJnVjLj8TwkI2JhqsHUiOccWdP0X2LRDo3YbMT=s1360-w1360-h1020-rw',

  // Manali
  'manali-solang-valley': 'https://www.snowvalleyresorts.com/wp-content/uploads/featurd-image-min-915x513.webp',
  'solang valley': 'https://www.snowvalleyresorts.com/wp-content/uploads/featurd-image-min-915x513.webp',
  'solang': 'https://www.snowvalleyresorts.com/wp-content/uploads/featurd-image-min-915x513.webp',
  'solang valley adventure activities': 'https://www.snowvalleyresorts.com/wp-content/uploads/featurd-image-min-915x513.webp',

  'manali-hadimba-temple': 'https://media.istockphoto.com/id/1334792935/photo/hidimba-devi-or-hadimba-temple-manali.webp?a=1&b=1&s=612x612&w=0&k=20&c=r3fEFiD_DH2rJ_DuIbAP1Au9cpnxtRvsL-k6fF4KON8=',
  'hadimba temple': 'https://media.istockphoto.com/id/1334792935/photo/hidimba-devi-or-hadimba-temple-manali.webp?a=1&b=1&s=612x612&w=0&k=20&c=r3fEFiD_DH2rJ_DuIbAP1Au9cpnxtRvsL-k6fF4KON8=',
  'hadimba devi wooden temple': 'https://media.istockphoto.com/id/1334792935/photo/hidimba-devi-or-hadimba-temple-manali.webp?a=1&b=1&s=612x612&w=0&k=20&c=r3fEFiD_DH2rJ_DuIbAP1Au9cpnxtRvsL-k6fF4KON8=',
  'hadimba devi wooden temple & dhungri van vihar': 'https://media.istockphoto.com/id/1334792935/photo/hidimba-devi-or-hadimba-temple-manali.webp?a=1&b=1&s=612x612&w=0&k=20&c=r3fEFiD_DH2rJ_DuIbAP1Au9cpnxtRvsL-k6fF4KON8=',

  'manali-rohtang-pass': 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg',
  'rohtang pass': 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg',
  'rohtang': 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg',
  'rohtang pass snow excursion': 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg',
  'rohtang pass snow excursion (13,058 ft)': 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg',

  'manali-old-manali': 'https://manalitourism.co.in/images/places-to-visit/headers/hot-water-springs-at-vashisht-temple-manali-header-manali-tourism.jpg.jpg',
  'vashisht hot sulphur springs': 'https://manalitourism.co.in/images/places-to-visit/headers/hot-water-springs-at-vashisht-temple-manali-header-manali-tourism.jpg.jpg',
  'old manali village & vashisht hot sulphur springs': 'https://manalitourism.co.in/images/places-to-visit/headers/hot-water-springs-at-vashisht-temple-manali-header-manali-tourism.jpg.jpg',

  // Amritsar
  'amritsar-golden-temple': 'https://images.unsplash.com/photo-1730620776114-876458fdbf2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGhlJTIwR29sZGVuJTIwVGVtcGxlfGVufDB8fDB8fHww',
  'golden temple': 'https://images.unsplash.com/photo-1730620776114-876458fdbf2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGhlJTIwR29sZGVuJTIwVGVtcGxlfGVufDB8fDB8fHww',
  'the golden temple': 'https://images.unsplash.com/photo-1730620776114-876458fdbf2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGhlJTIwR29sZGVuJTIwVGVtcGxlfGVufDB8fDB8fHww',
  'sri harmandir sahib (the golden temple & langar)': 'https://images.unsplash.com/photo-1730620776114-876458fdbf2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGhlJTIwR29sZGVuJTIwVGVtcGxlfGVufDB8fDB8fHww',

  'amritsar-wagah-border': 'https://s7ap1.scene7.com/is/image/incredibleindia/attari-wagah-border-amritsar-punjab-6-musthead-hero?qlt=82&ts=1726662188697',
  'wagah border': 'https://s7ap1.scene7.com/is/image/incredibleindia/attari-wagah-border-amritsar-punjab-6-musthead-hero?qlt=82&ts=1726662188697',
  'wagah border beating retreat ceremony': 'https://s7ap1.scene7.com/is/image/incredibleindia/attari-wagah-border-amritsar-punjab-6-musthead-hero?qlt=82&ts=1726662188697',

  'amritsar-jallianwala-bagh': 'https://plus.unsplash.com/premium_photo-1697729441943-f1bffee0b432?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SmFsbGlhbndhbGElMjBCYWdoJTIwTmF0aW9uYWwlMjBNZW1vcmlhbHxlbnwwfHwwfHx8MA%3D%3D',
  'jallianwala bagh': 'https://plus.unsplash.com/premium_photo-1697729441943-f1bffee0b432?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SmFsbGlhbndhbGElMjBCYWdoJTIwTmF0aW9uYWwlMjBNZW1vcmlhbHxlbnwwfHwwfHx8MA%3D%3D',
  'jallianwala bagh national memorial': 'https://plus.unsplash.com/premium_photo-1697729441943-f1bffee0b432?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SmFsbGlhbndhbGElMjBCYWdoJTIwTmF0aW9uYWwlMjBNZW1vcmlhbHxlbnwwfHwwfHx8MA%3D%3D',

  // Jaisalmer
  'jaisalmer-fort': 'https://images.unsplash.com/photo-1713349881676-594b95a5742b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWRpdCUzQSUyMEphaXNhbG1lciUyMEZvcnQlMjAoU29uYXIlMjBRaWxhJTIwJTJGJTIwR29sZGVuJTIwRm9ydCl8ZW58MHx8MHx8fDA%3D',
  'jaisalmer fort': 'https://images.unsplash.com/photo-1713349881676-594b95a5742b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWRpdCUzQSUyMEphaXNhbG1lciUyMEZvcnQlMjAoU29uYXIlMjBRaWxhJTIwJTJGJTIwR29sZGVuJTIwRm9ydCl8ZW58MHx8MHx8fDA%3D',
  'jaisalmer fort (sonar qila / golden fort)': 'https://images.unsplash.com/photo-1713349881676-594b95a5742b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWRpdCUzQSUyMEphaXNhbG1lciUyMEZvcnQlMjAoU29uYXIlMjBRaWxhJTIwJTJGJTIwR29sZGVuJTIwRm9ydCl8ZW58MHx8MHx8fDA%3D',
  'sonar qila': 'https://images.unsplash.com/photo-1713349881676-594b95a5742b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWRpdCUzQSUyMEphaXNhbG1lciUyMEZvcnQlMjAoU29uYXIlMjBRaWxhJTIwJTJGJTIwR29sZGVuJTIwRm9ydCl8ZW58MHx8MHx8fDA%3D',
  'golden fort': 'https://images.unsplash.com/photo-1713349881676-594b95a5742b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWRpdCUzQSUyMEphaXNhbG1lciUyMEZvcnQlMjAoU29uYXIlMjBRaWxhJTIwJTJGJTIwR29sZGVuJTIwRm9ydCl8ZW58MHx8MHx8fDA%3D',

  'jaisalmer-sam-dunes': 'https://plus.unsplash.com/premium_photo-1661936495413-875706d59696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FtJTIwU2FuZCUyMER1bmVzJTIwQ2FtZWwlMjBTYWZhcmklMjAlMjYlMjBEZXNlcnQlMjBDYW1wJTVDfGVufDB8fDB8fHww',
  'sam sand dunes': 'https://plus.unsplash.com/premium_photo-1661936495413-875706d59696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FtJTIwU2FuZCUyMER1bmVzJTIwQ2FtZWwlMjBTYWZhcmklMjAlMjYlMjBEZXNlcnQlMjBDYW1wJTVDfGVufDB8fDB8fHww',
  'sam sand dunes camel safari & desert camp': 'https://plus.unsplash.com/premium_photo-1661936495413-875706d59696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FtJTIwU2FuZCUyMER1bmVzJTIwQ2FtZWwlMjBTYWZhcmklMjAlMjYlMjBEZXNlcnQlMjBDYW1wJTVDfGVufDB8fDB8fHww',

  'jaisalmer-patwon-haveli': 'https://images.unsplash.com/photo-1677649117932-4c8abf3e27bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGF0d29uJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D',
  'patwon ki haveli': 'https://images.unsplash.com/photo-1677649117932-4c8abf3e27bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGF0d29uJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D',
  'patwon ki haveli & salim singh haveli': 'https://images.unsplash.com/photo-1677649117932-4c8abf3e27bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGF0d29uJTIwS2klMjBIYXZlbGl8ZW58MHx8MHx8fDA%3D',

  // Dharamshala / McLeodGanj
  'dharamshala-dalai-lama-temple': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw',
  'mcleodganj-tsuglagkhang': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw',
  'tsuglagkhang complex': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw',
  'tsuglagkhang complex (dalai lama temple & monastery)': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw',
  'tsuglagkhang dalai lama temple complex': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Td0_D_MqtXCZ8aNSbYUuVSf3jtqpodrlx7Cl6PwsshhJBtq3KtDHHBjHk9C_mWqQ3NTdwtW_3RQgWYangPz_0bfndByHMxRGG-CtfzH2PsKwywf6ucdkd825GhYg3lwtCKu68=s1360-w1360-h1020-rw',

  'dharamshala-hpca-stadium': 'https://www.swantour.com/blogs/wp-content/uploads/2020/01/Dharamsala-Cricket-Stadium.jpg',
  'hpca cricket stadium': 'https://www.swantour.com/blogs/wp-content/uploads/2020/01/Dharamsala-Cricket-Stadium.jpg',
  'hpca international cricket stadium': 'https://www.swantour.com/blogs/wp-content/uploads/2020/01/Dharamsala-Cricket-Stadium.jpg',

  // Rishikesh
  'rishikesh-ganga-aarti': 'https://img.avianexperiences.com/trek/2d3f1914-76ba-492d-a875-f90361caaaa7',
  'triveni ghat': 'https://img.avianexperiences.com/trek/2d3f1914-76ba-492d-a875-f90361caaaa7',
  'triveni ghat evening maha aarti & ram jhula': 'https://img.avianexperiences.com/trek/2d3f1914-76ba-492d-a875-f90361caaaa7',

  'rishikesh-beatles-ashram': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/r/32/77/f4/61/caption.jpg',
  'the beatles ashram': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/r/32/77/f4/61/caption.jpg',
  'beatles ashram': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/r/32/77/f4/61/caption.jpg',
  'the beatles ashram (chaurasi kutia) & meditation': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/r/32/77/f4/61/caption.jpg',

  'rishikesh-neelkanth': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNOCSkFcwAuGavdINXh1Keytlh7JOR8djKGWvINmzplGPRkxvUfCanEwJ&s=10',
  'neelkanth mahadev temple': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNOCSkFcwAuGavdINXh1Keytlh7JOR8djKGWvINmzplGPRkxvUfCanEwJ&s=10',
  'neelkanth mahadev temple & cliff views': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNOCSkFcwAuGavdINXh1Keytlh7JOR8djKGWvINmzplGPRkxvUfCanEwJ&s=10',

  'rishikesh-parmarth-niketan': 'https://images.unsplash.com/photo-1718383537262-2236fd7c8180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFybWFydGglMjBOaWtldGFuJTIwQXNocmFtfGVufDB8fDB8fHww',
  'parmarth niketan': 'https://images.unsplash.com/photo-1718383537262-2236fd7c8180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFybWFydGglMjBOaWtldGFuJTIwQXNocmFtfGVufDB8fDB8fHww',
  'parmarth niketan ashram': 'https://images.unsplash.com/photo-1718383537262-2236fd7c8180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFybWFydGglMjBOaWtldGFuJTIwQXNocmFtfGVufDB8fDB8fHww',
  'pratham nikethan ashram': 'https://images.unsplash.com/photo-1718383537262-2236fd7c8180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFybWFydGglMjBOaWtldGFuJTIwQXNocmFtfGVufDB8fDB8fHww',

  // Haridwar
  'haridwar-har-ki-pauri': 'https://images.unsplash.com/photo-1728272355265-173820e9d673?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEhhciUyMEtpJTIwUGF1cmklMjBFdmVuaW5nJTIwR2FuZ2ElMjBBYXJ0aXxlbnwwfHwwfHx8MA%3D%3D',
  'har ki pauri': 'https://images.unsplash.com/photo-1728272355265-173820e9d673?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEhhciUyMEtpJTIwUGF1cmklMjBFdmVuaW5nJTIwR2FuZ2ElMjBBYXJ0aXxlbnwwfHwwfHx8MA%3D%3D',
  'har ki pauri evening ganga aarti': 'https://images.unsplash.com/photo-1728272355265-173820e9d673?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEhhciUyMEtpJTIwUGF1cmklMjBFdmVuaW5nJTIwR2FuZ2ElMjBBYXJ0aXxlbnwwfHwwfHx8MA%3D%3D',

  'haridwar-mansa-devi': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABGy90fvqsgDdn4yiFzC0XDNpeqNtFggyajkB74bLLw&s=10',
  'mansa devi temple': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABGy90fvqsgDdn4yiFzC0XDNpeqNtFggyajkB74bLLw&s=10',
  'mansa devi temple & udankhatola ropeway': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABGy90fvqsgDdn4yiFzC0XDNpeqNtFggyajkB74bLLw&s=10',

  'haridwar-chandi-devi': 'https://blog.yatradham.org/wp-content/uploads/2020/02/Chandi-Devi-Temple.jpg',
  'chandi devi temple': 'https://blog.yatradham.org/wp-content/uploads/2020/02/Chandi-Devi-Temple.jpg',
  'chandi devi temple & neel parvat trek': 'https://blog.yatradham.org/wp-content/uploads/2020/02/Chandi-Devi-Temple.jpg',

  // Bharatpur
  'bharatpur-keoladeo': 'https://www.rajasthancab.com/uploads/blog/1744708899-blog-image.webp',
  'keoladeo ghana national park': 'https://www.rajasthancab.com/uploads/blog/1744708899-blog-image.webp',
  'keoladeo ghana national park (unesco bird sanctuary)': 'https://www.rajasthancab.com/uploads/blog/1744708899-blog-image.webp',

  'bharatpur-lohagarh': 'https://s7ap1.scene7.com/is/image/incredibleindia/bharatpur-palace-and-museum-bharatpur-rajasthan-tri-hero?qlt=82&ts=1727166273101',
  'lohagarh fort': 'https://s7ap1.scene7.com/is/image/incredibleindia/bharatpur-palace-and-museum-bharatpur-rajasthan-tri-hero?qlt=82&ts=1727166273101',
  'lohagarh fort (iron fort) & government museum': 'https://s7ap1.scene7.com/is/image/incredibleindia/bharatpur-palace-and-museum-bharatpur-rajasthan-tri-hero?qlt=82&ts=1727166273101',
  // Gulmarg
  'gulmarg-st-marys': 'https://upload.wikimedia.org/wikipedia/commons/8/83/St._Mary%27s_Church%2C_Gulmarg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  "st. mary's church": 'https://upload.wikimedia.org/wikipedia/commons/8/83/St._Mary%27s_Church%2C_Gulmarg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  "st. mary’s church": 'https://upload.wikimedia.org/wikipedia/commons/8/83/St._Mary%27s_Church%2C_Gulmarg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  "st. mary's church & strawberry valley": 'https://upload.wikimedia.org/wikipedia/commons/8/83/St._Mary%27s_Church%2C_Gulmarg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  "st. mary’s church & strawberry valley": 'https://upload.wikimedia.org/wikipedia/commons/8/83/St._Mary%27s_Church%2C_Gulmarg.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',

  // Bodh Gaya
  'bodhgaya-bodhi-tree': 'https://tricycle.org/wp-content/uploads/2019/04/bodhi-tree.jpg',
  'bodhi tree': 'https://tricycle.org/wp-content/uploads/2019/04/bodhi-tree.jpg',

  // Chitrakoot
  'chitrakoot-ramghat': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmWLux5g3HxIeP_P-PW_DMzTouOrmGTDoiZYngSR5Kl_00aDXyCJoZLwCb5Jws-OFhR8J_huvuLTGP5aNG2Oi14iuyihQ3r4PCMhJ0KNKecYhH1rYuL7H522LBbFy6XTiHjRC9p7a3Kjd6B=s1360-w1360-h1020-rw',
  'ramghat': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmWLux5g3HxIeP_P-PW_DMzTouOrmGTDoiZYngSR5Kl_00aDXyCJoZLwCb5Jws-OFhR8J_huvuLTGP5aNG2Oi14iuyihQ3r4PCMhJ0KNKecYhH1rYuL7H522LBbFy6XTiHjRC9p7a3Kjd6B=s1360-w1360-h1020-rw',
  'ramghat in chitrakoot': 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmWLux5g3HxIeP_P-PW_DMzTouOrmGTDoiZYngSR5Kl_00aDXyCJoZLwCb5Jws-OFhR8J_huvuLTGP5aNG2Oi14iuyihQ3r4PCMhJ0KNKecYhH1rYuL7H522LBbFy6XTiHjRC9p7a3Kjd6B=s1360-w1360-h1020-rw',
  // Jaipur - Jhalana Leopard Safari
  'jaipur-jhalana-safari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Leopard-Jhalana-01.jpg/1280px-Leopard-Jhalana-01.jpg',
  'jhalana leopard safari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Leopard-Jhalana-01.jpg/1280px-Leopard-Jhalana-01.jpg',
  'jhalana safari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Leopard-Jhalana-01.jpg/1280px-Leopard-Jhalana-01.jpg',
  'jhalana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Leopard-Jhalana-01.jpg/1280px-Leopard-Jhalana-01.jpg',
};

export function getAttractionImage(attractionNameOrId: string, defaultImage?: string): string {
  if (!attractionNameOrId) return defaultImage || '';
  const key = attractionNameOrId.toLowerCase().trim();
  if (ATTRACTION_IMAGE_OVERRIDES[key]) return ATTRACTION_IMAGE_OVERRIDES[key];
  for (const [k, url] of Object.entries(ATTRACTION_IMAGE_OVERRIDES)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return defaultImage || '';
}

