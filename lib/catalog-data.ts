import { Destination, Attraction } from '@/types';

export const COMPREHENSIVE_DESTINATIONS: Destination[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi / NCR',
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
    shortDescription: 'The Venice of the East, famed for shimmering Lake Pichola and white marble island palaces.',
    detailedDescription: 'Set against the ancient Aravalli Hills, Udaipur offers spectacular palaces, tranquil sunset boat cruises, and royal Mewar heritage.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Udaipur_City_Palace.jpg/1280px-Udaipur_City_Palace.jpg',
    gallery: []
  },
  {
    id: 'mount-abu',
    name: 'Mount Abu',
    state: 'Rajasthan',
    country: 'India',
    shortDescription: 'Rajasthan’s premier hill station nestled in the lush Aravalli hills, famed for Dilwara Jain Temples and Nakki Lake.',
    detailedDescription: 'Perched at 1,220 meters, Mount Abu offers cool highland retreats, the world-famous carved marble Dilwara Temples, scenic boat cruises on Nakki Lake, and sunset views from Guru Shikhar.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg',
    gallery: []
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    state: 'Rajasthan',
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
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
    country: 'India',
    shortDescription: 'Holy confluence of the Ganga, Yamuna, and Saraswati rivers, host to the sacred Kumbh Mela.',
    detailedDescription: 'World-famous Triveni Sangam for holy dips, the historic subterranean Bade Hanuman Ji Mandir, Anand Bhavan, and rich colonial-era cultural heritage.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/NorthIndiaCircuit_250.jpg/1280px-NorthIndiaCircuit_250.jpg',
    gallery: []
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'Scenic capital of Uttarakhand nestled in the Doon Valley between the holy Ganga and Yamuna rivers.',
    detailedDescription: 'Gateway to the Garhwal Himalayas renowned for premier educational institutes, subterranean limestone caves at Robber’s Cave, medicinal sulphur pools at Sahastradhara, and serene Tibetan monasteries.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'The Queen of the Hills perched on the Garhwal Himalayan foothills overlooking the Doon Valley.',
    detailedDescription: 'Celebrated colonial-era hill resort famous for Kempty Falls cascades, the scenic Gun Hill cable car, panoramic views from Lal Tibba, and Sir George Everest’s historic estate.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'nainital',
    name: 'Nainital',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'The Lake District of Kumaon centered around the emerald crescent-shaped Naini Lake.',
    detailedDescription: 'Picturesque hill retreat surrounded by seven lush peaks, featuring rowing boat rides on Naini Lake, the revered Naina Devi Temple, and snow-capped Himalayan vantage points.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Naini_Lake%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Naini_Lake%2C_Nainital%2C_Uttarakhand%2C_India.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg/1280px-Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/View_of_Nainital_from_Snow_View_Point.jpg/1280px-View_of_Nainital_from_Snow_View_Point.jpg'
    ]
  },
  {
    id: 'badrinath',
    name: 'Badrinath',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'Sacred Char Dham shrine of Lord Vishnu nestled between Nar and Narayana mountain ranges.',
    detailedDescription: 'One of Hinduism’s most revered holy pilgrimage destinations located along the Alaknanda River at 3,300 meters, featuring thermal sulphur springs at Tapt Kund and Mana, the last Indian border village.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'The holiest Jyotirlinga of Lord Shiva surrounded by towering snow-clad Himalayan peaks.',
    detailedDescription: 'Perched at 3,584 meters near the Mandakini River source and Chorabari Glacier, this eighth-century stone temple built by Adi Shankaracharya is one of the most sacred pilgrimage journeys on Earth.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'gangotri',
    name: 'Gangotri',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'The sacred source of the holy River Ganga amidst pine-clad Himalayan peaks.',
    detailedDescription: 'Located at 3,100 meters along the Bhagirathi River, this Char Dham pilgrimage site features the 18th-century white granite temple dedicated to Goddess Ganga built by Gurkha general Amar Singh Thapa.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'yamunotri',
    name: 'Yamunotri',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: 'Sacred seat of Goddess Yamuna and the first stop of the revered Char Dham Yatra.',
    detailedDescription: 'Perched at 3,291 meters in the Garhwal Himalayas, Yamunotri features thermal hot springs where pilgrims cook rice in Surya Kund, the Divya Shila rock pillar, and pristine mountain wilderness.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'jim-corbett',
    name: 'Jim Corbett National Park',
    state: 'Uttarakhand',
    country: 'India',
    shortDescription: "India's premier tiger reserve nestled in the Himalayan foothills along the Ramganga River.",
    detailedDescription: "India's oldest national park, globally famed for royal Bengal tigers, wild Asian elephants, leopards, and rich Sal forests across scenic valleys and riverbeds.",
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'hanoi',
    name: 'Hanoi',
    state: 'Northern Vietnam',
    country: 'Vietnam',
    shortDescription: 'Vietnam’s enchanting capital celebrated for colonial architecture, tree-lined boulevards, and vibrant street life.',
    detailedDescription: 'Over a thousand years of history visible in the maze of 36 ancient trade guilds in the Old Quarter, tranquil Hoan Kiem Lake, French colonial mansions, and the historic Temple of Literature.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'ha-long-bay',
    name: 'Ha Long Bay',
    state: 'Quang Ninh',
    country: 'Vietnam',
    shortDescription: 'World-famous emerald waters punctuated by thousands of towering limestone karst islands.',
    detailedDescription: 'UNESCO World Heritage natural wonderland renowned for overnight luxury wooden junk cruises, illuminated stalactite caverns, floating fishing villages, and tranquil kayaking lagoons.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'da-nang',
    name: 'Da Nang',
    state: 'Central Vietnam',
    country: 'Vietnam',
    shortDescription: 'Vibrant modern coastal metropolis famed for white sandy beaches, bridges, and mountain retreats.',
    detailedDescription: 'Central Vietnam’s bustling coastal hub featuring Ba Na Hills French village, the world-famous Golden Bridge held by giant stone hands, and the fire-breathing Dragon Bridge.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'hoi-an',
    name: 'Hoi An',
    state: 'Quang Nam',
    country: 'Vietnam',
    shortDescription: 'UNESCO World Heritage lantern-lit trading port frozen in 16th to 19th-century charm.',
    detailedDescription: 'Wonderfully preserved trading port showcasing Japanese covered bridges, Chinese assembly halls, tailor-made silk artisan shops, and evening lantern boat releases on the Thu Bon River.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'ho-chi-minh-city',
    name: 'Ho Chi Minh City',
    state: 'Southern Vietnam',
    country: 'Vietnam',
    shortDescription: 'Vietnam’s bustling economic engine blending French colonial landmarks with lively night markets.',
    detailedDescription: 'The vibrant southern metropolis formerly known as Saigon, boasting the Cu Chi underground tunnels, War Remnants Museum, Notre-Dame Cathedral Basilica, and bustling Ben Thanh Market.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'colombo',
    name: 'Colombo',
    state: 'Western Province',
    country: 'Sri Lanka',
    shortDescription: 'Island capital blending coastal colonial charm, Buddhist shrines, and ocean-facing parks.',
    detailedDescription: 'The vibrant commercial capital of Sri Lanka on the Indian Ocean, known for Gangaramaya Temple, sunset walks along Galle Face Green, colonial Fort architecture, and vibrant bazaars.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'kandy',
    name: 'Kandy',
    state: 'Central Province',
    country: 'Sri Lanka',
    shortDescription: 'Sacred cultural capital of Sri Lanka cradled by forested hills around a tranquil lake.',
    detailedDescription: 'The last royal capital of Sri Lankan kings, home to the sacred Temple of the Tooth Relic housing Buddha’s tooth, the sprawling Royal Botanical Gardens of Peradeniya, and vibrant Kandyan dance performances.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    state: 'Central Highlands',
    country: 'Sri Lanka',
    shortDescription: '“Little England” of Sri Lanka amidst misty emerald tea hills and English country cottages.',
    detailedDescription: 'Perched at 1,868 meters with cool highland climate, famous for Pedro and Mackwoods Ceylon tea plantations, colonial post offices, Gregory Lake water sports, and Ramboda waterfalls.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'ella',
    name: 'Ella',
    state: 'Badulla District',
    country: 'Sri Lanka',
    shortDescription: 'Laidback mountain village famous for iconic railway bridges, ravines, and scenic hiking peaks.',
    detailedDescription: 'Famed backpacker haven nestled in high mountain passes, celebrated for the colonial Nine Arches Demodara railway bridge, Little Adam’s Peak hikes, and lush Ravana Falls.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    state: 'Matale District',
    country: 'Sri Lanka',
    shortDescription: 'The dramatic 5th-century Lion Rock fortress rising 200 meters from central jungle plains.',
    detailedDescription: 'Ancient palace and fortress complex built by King Kashyapa, featuring ancient frescoes, the Mirror Wall, massive lion paws guarding the summit stairway, and nearby Dambulla rock caves.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'dubai',
    name: 'Dubai City',
    state: 'Dubai Emirate',
    country: 'United Arab Emirates',
    shortDescription: 'Futuristic metropolis of record-breaking skyscrapers, mega malls, and golden desert dunes.',
    detailedDescription: 'The world’s capital of luxury and innovation, home to the Burj Khalifa, the Dubai Fountain show, man-made Palm Jumeirah, desert 4x4 safaris, and traditional Gold & Spice Souks.',
    recommendedDuration: '3–4 Days',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    state: 'Abu Dhabi Emirate',
    country: 'United Arab Emirates',
    shortDescription: 'Magnificent cultural capital of the UAE crowned by the white marble Sheikh Zayed Grand Mosque.',
    detailedDescription: 'Sophisticated capital island showcasing architectural masterworks including the Sheikh Zayed Grand Mosque with 82 domes, Louvre Abu Dhabi’s dome of light, and Yas Island thrills.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'bali',
    name: 'Bali',
    state: 'Bali Province',
    country: 'Indonesia',
    shortDescription: 'The Island of the Gods famed for forested volcanic mountains, rice terraces, and coral beaches.',
    detailedDescription: 'Renowned spiritual and tropical paradise famous for Ubud’s art and monkey forests, Tegallalang rice paddies, cliffside temples at Uluwatu, and dramatic sea temples at Tanah Lot.',
    recommendedDuration: '4–5 Days',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'jakarta',
    name: 'Jakarta',
    state: 'Java',
    country: 'Indonesia',
    shortDescription: 'Indonesia’s energetic capital fusing Dutch colonial heritage with modern skyscrapers.',
    detailedDescription: 'Sprawling metropolis on northwest Java, featuring historical Kota Tua Batavia squares, the soaring National Monument (Monas), Istiqlal Mosque, and vibrant Indonesian culinary streets.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    state: 'Special Region of Yogyakarta',
    country: 'Indonesia',
    shortDescription: 'The cradle of Javanese civilization, home to the magnificent Borobudur and Prambanan temples.',
    detailedDescription: 'Java’s cultural heart ruled by a sultanate, renowned for the 9th-century Buddhist Borobudur stupa complex, the towering Hindu temples of Prambanan, and Mount Merapi jeep safaris.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'tbilisi',
    name: 'Tbilisi',
    state: 'Eastern Georgia',
    country: 'Georgia',
    shortDescription: 'Enchanting Caucasian capital of pastel carved wooden balconies, sulfur baths, and fortress hills.',
    detailedDescription: 'Founded in the 5th century along the Mtkvari River, Tbilisi features domed subterranean sulfur baths at Abanotubani, Narikala Fortress, the contemporary Bridge of Peace, and vibrant wine cellars.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'batumi',
    name: 'Batumi',
    state: 'Adjara',
    country: 'Georgia',
    shortDescription: 'Sparkling Black Sea pearl blending futuristic skyscrapers, seaside boulevards, and botanical cliffs.',
    detailedDescription: 'Georgia’s premier coastal resort on the subtropical Black Sea coast, known for the 7 km Batumi Boulevard, moving metal statues of Ali and Nino, and the lush Cape Verde Botanical Garden.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'kazbegi',
    name: 'Kazbegi',
    state: 'Mtskheta-Mtianeti',
    country: 'Georgia',
    shortDescription: 'Dramatic Caucasus mountain paradise crowned by the 14th-century Gergeti Trinity Church.',
    detailedDescription: 'Stepantsminda in the high Greater Caucasus along the historic Georgian Military Highway, offering breathtaking views of snow-covered Mount Kazbek (5,047m) and Gergeti Trinity Church.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'almaty',
    name: 'Almaty',
    state: 'Almaty Region',
    country: 'Kazakhstan',
    shortDescription: 'Kazakhstan’s leafy cultural hub nestled beneath the snow-capped Tian Shan mountain range.',
    detailedDescription: 'Kazakhstan’s southern metropolis framed by the Trans-Ili Alatau mountains, featuring the world-famous Medeu outdoor ice rink, Shymbulak ski resort, Kok Tobe hill, and the colorful wooden Zenkov Cathedral.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'astana',
    name: 'Astana',
    state: 'Central Kazakhstan',
    country: 'Kazakhstan',
    shortDescription: 'Futuristic capital designed by legendary architects across the windswept steppe.',
    detailedDescription: 'Ultra-modern capital on the Ishim River showcasing world-renowned masterworks by Norman Foster and Kisho Kurokawa: the 97-meter Baiterek Tower, the Pyramid of Peace, and the giant tent of Khan Shatyr.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'tashkent',
    name: 'Tashkent',
    state: 'Tashkent Region',
    country: 'Uzbekistan',
    shortDescription: 'Central Asian crossroads capital combining ornate Islamic complexes, Soviet boulevards, and palace metro stations.',
    detailedDescription: 'Ancient Silk Road capital housing the world’s oldest Uthman Quran at Hazrati Imam, the bustling domed Chorsu Bazaar, Amir Timur Square, and palatial marble subway stations.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'samarkand',
    name: 'Samarkand',
    state: 'Samarkand Region',
    country: 'Uzbekistan',
    shortDescription: 'The jewel of the Silk Road world-famed for the turquoise mosaic domes of Registan Square.',
    detailedDescription: 'One of the oldest continuously inhabited cities in the world, capital of Emperor Timur’s empire, home to the three monumental madrasahs of Registan, Shah-i-Zinda necropolis, and Gur-e-Amir.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'bukhara',
    name: 'Bukhara',
    state: 'Bukhara Region',
    country: 'Uzbekistan',
    shortDescription: 'Living medieval Silk Road open-air museum of intact madrasahs, minarets, and covered trading domes.',
    detailedDescription: 'An ancient center of Islamic scholarship and Silk Road trade featuring the 48-meter Kalyan Minaret, the 5th-century Ark Fortress of the Emirs, serene Lyabi-Hauz pond plazas, and four-minaret Chor Minor.',
    recommendedDuration: '2 Days',
    heroImage: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'bishkek',
    name: 'Bishkek',
    state: 'Chuy Region',
    country: 'Kyrgyzstan',
    shortDescription: 'Tree-shaded capital backed by the dramatic snow-crowned Kyrgyz Ala-Too mountain ridge.',
    detailedDescription: 'Kyrgyzstan’s relaxed green capital known for marble Soviet monuments on Ala-Too Square, changing of the guard ceremonies, vibrant Osh Bazaar, and panoramic views of snow-capped peaks.',
    recommendedDuration: '1–2 Days',
    heroImage: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'ala-archa',
    name: 'Ala Archa',
    state: 'Tian Shan',
    country: 'Kyrgyzstan',
    shortDescription: 'Stunning alpine national park of glacial gorges, pine valleys, and 4,000-meter rocky peaks.',
    detailedDescription: 'Just 40 km south of Bishkek in the Tian Shan range, Ala Archa offers spectacular hiking along the rushing Ala-Archa river, pine forests, Ak-Sai waterfall, and glacier lookout trails.',
    recommendedDuration: '1 Day',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  },
  {
    id: 'issyk-kul',
    name: 'Issyk-Kul',
    state: 'Issyk-Kul Region',
    country: 'Kyrgyzstan',
    shortDescription: 'The “Pearl of the Tian Shan”, the world’s second-largest alpine lake that never freezes.',
    detailedDescription: 'Breathtaking high-altitude saline lake surrounded by the snow-capped Tian Shan mountains, famous for sandy beaches, the red sandstone Fairy Tale (Skazka) Canyon, and Petroglyphs open-air museum.',
    recommendedDuration: '2–3 Days',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: []
  }
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
  {
    id: 'delhi-rashtrapati-parliament',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Rashtrapati Bhavan and Parliament',
    shortDescription: 'Presidential palace and the Parliament of India along the grand Rajpath / Kartavya Path.',
    detailedDescription: 'Drive past the majestic Rashtrapati Bhavan, North & South Blocks, and the iconic Indian Parliament House along Kartavya Path.',
    duration: '45 Minutes',
    category: 'National Monument',
    unesco: false,
    image: 'https://images.pexels.com/photos/3881113/pexels-photo-3881113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'delhi-national-war-memorial',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'National War Memorial',
    shortDescription: 'Sprawling 40-acre national monument dedicated to armed forces personnel who made the supreme sacrifice.',
    detailedDescription: 'Located near India Gate, this moving memorial comprises concentric circles—Amar Chakra, Veerta Chakra, Tyag Chakra, and Raksha Chakra—honoring Indian soldiers.',
    duration: '1 Hour',
    category: 'National Memorial',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Newly_inaugurated_National_War_Memorial_New_Delhi.jpg'
  },
  {
    id: 'delhi-indira-gandhi-memorial',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    name: 'Indira Gandhi Memorial Museum',
    shortDescription: 'Former residence of Prime Minister Indira Gandhi preserved as a poignant historical museum.',
    detailedDescription: 'Located at 1 Safdarjung Road, preserved with personal artifacts, library, and photographs documenting her life, tenure, and India’s contemporary history.',
    duration: '1 Hour',
    category: 'Historical Museum',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Indira_Gandhi_Memorial_Museum.jpg'
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
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw'
  },
  {
    id: 'fs-palace-complex',
    destinationId: 'fatehpur-sikri',
    destinationName: 'Fatehpur Sikri',
    name: 'Fatehpur Sikri Royal Palaces',
    shortDescription: 'Diwan-i-Khas central carved lotus pillar, Diwan-i-Aam, and Anup Talao ornamental pool.',
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
    image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw'
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
    name: 'Nahargarh Fort',
    shortDescription: 'Ridgetop fortress offering breathtaking 360-degree panoramas over the entire Pink City.',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg/1280px-Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg'
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg'
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
  {
    id: 'udaipur-mount-abu-excursion',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Mount Abu Day Excursion (Dilwara Temples & Nakki Lake)',
    shortDescription: 'Full-day excursion to Rajasthan’s premier hill station visiting Dilwara Jain Temples and boating on Nakki Lake.',
    detailedDescription: 'Scenic 3-hour hill drive ascending the Aravalli range to Mount Abu. Marvel at the world-renowned marble filigree of the 11th-century Dilwara Temples, stroll along Nakki Lake, and visit Toad Rock.',
    duration: 'Full Day (8–9 Hours)',
    category: 'Hill Station Excursion',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg'
  },

  // ==========================================
  // MOUNT ABU
  // ==========================================
  {
    id: 'mount-abu-dilwara',
    destinationId: 'mount-abu',
    destinationName: 'Mount Abu',
    name: 'Dilwara Jain Temples',
    shortDescription: '11th to 13th-century marble temple complex acclaimed for unmatched ornamental ceiling and pillar carvings.',
    detailedDescription: 'A pilgrimage masterpiece of marble architecture comprising five ornate shrines, notably Vimal Vasahi and Luna Vasahi, famous for paper-thin translucent marble domes, lotus pendants, and intricate mythological friezes.',
    duration: '2 Hours',
    category: 'Heritage Marble Temple',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg'
  },
  {
    id: 'mount-abu-nakki-lake',
    destinationId: 'mount-abu',
    destinationName: 'Mount Abu',
    name: 'Nakki Lake & Toad Rock',
    shortDescription: 'Ancient sacred hill lake framed by rolling hills, pedal boating, and the iconic Toad Rock viewpoint.',
    detailedDescription: 'Legend states Nakki Lake was dug out using fingernails by gods. Enjoy scenic boating, promenade walks, and a gentle climb to Toad Rock for panoramic views of the water.',
    duration: '1.5 Hours',
    category: 'Scenic Lake & Viewpoint',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg'
  },
  {
    id: 'mount-abu-guru-shikhar',
    destinationId: 'mount-abu',
    destinationName: 'Mount Abu',
    name: 'Guru Shikhar & Sunset Point',
    shortDescription: 'The highest peak in Rajasthan (1,722 m) housing Dattatreya Temple and breathtaking mountain vistas.',
    detailedDescription: 'Crown summit of the Aravalli range offering dramatic 360-degree panoramas, ancient bell tower, and vantage points overlooking valleys cloaked in evening mist.',
    duration: '2 Hours',
    category: 'Mountain Peak & Panoramic View',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Guru_shikhar_-_mount_abu.jpg/1280px-Guru_shikhar_-_mount_abu.jpg'
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg/1280px-Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg'
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
  },
  {
    id: 'dehradun-robbers-cave',
    destinationId: 'dehradun',
    destinationName: 'Dehradun',
    name: 'Robber\'s Cave (Guchhupani)',
    shortDescription: 'A natural limestone gorge where an icy stream flows through a narrow cave.',
    detailedDescription: 'Fascinating 600-meter-long cave formation where underground springs emerge and disappear mysteriously.',
    duration: '1.5–2 Hours',
    category: 'Natural Gorge',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dehradun-sahastradhara',
    destinationId: 'dehradun',
    destinationName: 'Dehradun',
    name: 'Sahastradhara Sulphur Springs & Waterfall',
    shortDescription: 'The "Thousand-Fold Spring" celebrated for medicinal therapeutic sulphur pools.',
    detailedDescription: 'Cascading waterfalls trickling down limestone stalactite caves rich in medicinal minerals.',
    duration: '2 Hours',
    category: 'Natural Spring',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dehradun-mindrolling',
    destinationId: 'dehradun',
    destinationName: 'Dehradun',
    name: 'Mindrolling Monastery & Great Stupa',
    shortDescription: 'One of India’s largest Tibetan Buddhist centers crowned by the 185-foot Great Stupa.',
    detailedDescription: 'Serene monastery adorned with vibrant mural shrines, golden Buddha statues, and prayer wheel gardens.',
    duration: '1.5 Hours',
    category: 'Buddhist Monastery',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dehradun-fri',
    destinationId: 'dehradun',
    destinationName: 'Dehradun',
    name: 'Forest Research Institute (FRI)',
    shortDescription: 'Colossal Greco-Roman colonial estate with six forestry forestry museums.',
    detailedDescription: 'Sprawling 450-hectare British imperial brick edifice featuring neoclassical courtyards.',
    duration: '2 Hours',
    category: 'Heritage Architecture',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dehradun-tapkeshwar',
    destinationId: 'dehradun',
    destinationName: 'Dehradun',
    name: 'Tapkeshwar Mahadev Cave Temple',
    shortDescription: 'Ancient riverside cave temple where water drops continuously on the sacred Shiva Lingam.',
    detailedDescription: 'Revered shrine in a natural cavern on the banks of the Asan River with mythological roots in the Mahabharata.',
    duration: '1 Hour',
    category: 'Sacred Cave Temple',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mussoorie-kempty-falls',
    destinationId: 'mussoorie',
    destinationName: 'Mussoorie',
    name: 'Kempty Falls Cascades',
    shortDescription: 'Famous tiered mountain waterfall cascading down 40 feet into a refreshing natural splash pool.',
    detailedDescription: 'Iconic tourist landmark developed by British officer John Mekinan in the 1830s, surrounded by high mountain cliffs and lush Garhwal valleys.',
    duration: '2 Hours',
    category: 'Waterfall',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Kempty_Falls_Mussoorie_2.jpg/1280px-Kempty_Falls_Mussoorie_2.jpg'
  },
  {
    id: 'mussoorie-gun-hill',
    destinationId: 'mussoorie',
    destinationName: 'Mussoorie',
    name: 'Gun Hill Ropeway & Mall Road',
    shortDescription: 'Second highest peak of Mussoorie accessible by cable car with 360-degree Himalayan views.',
    detailedDescription: 'Historical summit where a mid-day cannon was fired during colonial times, offering sweeping Doon Valley views.',
    duration: '2 Hours',
    category: 'Viewpoint & Promenade',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mussoorie-george-everest',
    destinationId: 'mussoorie',
    destinationName: 'Mussoorie',
    name: 'George Everest House & Cloud\'s End',
    shortDescription: 'Historic estate and observatory of the Surveyor-General of India Sir George Everest.',
    detailedDescription: 'Cliffside heritage retreat perched dramatically at the edge of the Aglar river valley and snow ranges.',
    duration: '2.5 Hours',
    category: 'Heritage & Hiking',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mussoorie-lal-tibba',
    destinationId: 'mussoorie',
    destinationName: 'Mussoorie',
    name: 'Lal Tibba Scenic Viewpoint',
    shortDescription: 'Highest point in Mussoorie located in Landour offering telescope views of Himalayan peaks.',
    detailedDescription: 'Unspoilt heritage ridge offering panoramic vistas of Badrinath, Kedarnath, and Bandarpoonch mountain peaks.',
    duration: '1 Hour',
    category: 'Scenic Viewpoint',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mussoorie-company-garden',
    destinationId: 'mussoorie',
    destinationName: 'Mussoorie',
    name: 'Company Garden & Nature Park',
    shortDescription: 'Manicured municipal garden filled with blooming alpine flowers, artificial lakes, and fountains.',
    detailedDescription: 'Charming family park maintained by the Garden Welfare Association, perfect for strolls and picnics.',
    duration: '1.5 Hours',
    category: 'Botanical Garden',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nainital-naini-lake',
    destinationId: 'nainital',
    destinationName: 'Nainital',
    name: 'Naini Lake Boating & Promenade',
    shortDescription: 'Emerald crescent lake flanked by seven peaks with colorful traditional rowing boats.',
    detailedDescription: 'Iconic centerpiece of Nainital with traditional colorful rowing boats, paddle boats, and lakeside promenades.',
    duration: '2 Hours',
    category: 'Sacred Lake & Boating',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg/1280px-Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg'
  },
  {
    id: 'nainital-naina-devi',
    destinationId: 'nainital',
    destinationName: 'Nainital',
    name: 'Maa Naina Devi Temple & Sacred Ghat',
    shortDescription: 'Ancient 51 Shakti Peetha shrine located on the northern shore of Naini Lake.',
    detailedDescription: 'Revered Hindu temple where the eyes (Naina) of Goddess Sati are believed to have fallen, offering panoramic lake views and spiritual serenity.',
    duration: '1.5 Hours',
    category: 'Sacred Temple',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg'
  },
  {
    id: 'nainital-snow-view',
    destinationId: 'nainital',
    destinationName: 'Nainital',
    name: 'Snow View Point Aerial Ropeway',
    shortDescription: 'Scenic cable car ride to 2,270m offering spellbinding views of Nanda Devi and Trishul peaks.',
    detailedDescription: 'Premier vantage point equipped with binoculars to view the snow-clad peaks of the great Himalayan barrier.',
    duration: '1.5 Hours',
    category: 'Himalayan Panorama',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/View_of_Nainital_from_Snow_View_Point.jpg/1280px-View_of_Nainital_from_Snow_View_Point.jpg'
  },
  {
    id: 'nainital-tiffin-top',
    destinationId: 'nainital',
    destinationName: 'Nainital',
    name: 'Tiffin Top (Dorothy\'s Seat) Trek',
    shortDescription: 'Stunning cliff top located on Ayarpatta hill with panoramic views of Nainital and Kumaon hills.',
    detailedDescription: 'Stonework memorial terrace built in memory of English artist Dorothy Kellet, accessible by scenic oak trail.',
    duration: '2.5 Hours',
    category: 'Hilltop Viewpoint',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tiffin-top_Nainital.jpg/1280px-Tiffin-top_Nainital.jpg'
  },
  {
    id: 'nainital-eco-cave',
    destinationId: 'nainital',
    destinationName: 'Nainital',
    name: 'Eco Cave Gardens & Nature Park',
    shortDescription: 'Network of six interconnected natural rocky caves shaped like Himalayan animal habitats.',
    detailedDescription: 'Thrilling crawl-through cave system featuring Tiger Cave, Panther Cave, and Bat Cave with hanging gardens.',
    duration: '1.5 Hours',
    category: 'Adventure Garden',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cave_park%2C_Nainital_2.jpg/1280px-Cave_park%2C_Nainital_2.jpg'
  },
  {
    id: 'nainital-mall-road',
    destinationId: 'nainital',
    destinationName: 'Nainital',
    name: 'Mall Road & Tibetan Market Stroll',
    shortDescription: 'Bustling lake-facing promenade lined with souvenir shops, candle artisans, and Tibetan woolens.',
    detailedDescription: 'Vibrant lakeside walking boulevard closed to vehicles in evening hours, filled with local aroma and artisan crafts.',
    duration: '2 Hours',
    category: 'Promenade & Shopping',
    unesco: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nainital%2C_Mall_Road.jpg/1280px-Nainital%2C_Mall_Road.jpg'
  },
  {
    id: 'badrinath-temple',
    destinationId: 'badrinath',
    destinationName: 'Badrinath',
    name: 'Shri Badrinath Ji Temple & Alaknanda Aarti',
    shortDescription: 'Ancient colourful pagoda-style temple dedicated to Lord Vishnu on the banks of Alaknanda.',
    detailedDescription: 'One of the four supreme Char Dham pilgrimage shrines in India, housing the self-manifested black stone Shaligram deity.',
    duration: '2.5 Hours',
    category: 'Holy Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'badrinath-tapt-kund',
    destinationId: 'badrinath',
    destinationName: 'Badrinath',
    name: 'Tapt Kund Natural Sulphur Hot Springs',
    shortDescription: 'Sacred geothermal hot water spring with natural therapeutic sulphur waters at 55°C.',
    detailedDescription: 'Pilgrims take a purifying holy dip in the natural thermal waters before entering the sacred Badrinath sanctuary.',
    duration: '1 Hour',
    category: 'Sacred Hot Spring',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'badrinath-mana-village',
    destinationId: 'badrinath',
    destinationName: 'Badrinath',
    name: 'Mana Village (First / Last Village of India)',
    shortDescription: 'Inhabited border village 3 km from Badrinath near the Indo-Tibetan border.',
    detailedDescription: 'Home to the indigenous Bhotia community, traditional handloom weaving, Vyas Gufa, and Ganesh Gufa caves.',
    duration: '2 Hours',
    category: 'Cultural Border Heritage',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'badrinath-bheem-pul',
    destinationId: 'badrinath',
    destinationName: 'Badrinath',
    name: 'Bheem Pul & Saraswati River Gorge',
    shortDescription: 'A gigantic natural stone bridge laid across the thunderous Saraswati River by Pandava prince Bheema.',
    detailedDescription: 'Dramatic natural rock slab spanning a vertical chasm through which the crystal-clear river rushes with tremendous force.',
    duration: '1.5 Hours',
    category: 'Mythological Landmark',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'badrinath-vasudhara',
    destinationId: 'badrinath',
    destinationName: 'Badrinath',
    name: 'Vasudhara Falls Alpine Trek',
    shortDescription: 'A breathtaking 400-foot waterfall dropping into the Alaknanda glacial valley.',
    detailedDescription: 'Scenic 5 km trek from Mana village through high Himalayan alpine meadows with sweeping glacier views.',
    duration: '3.5 Hours',
    category: 'Sacred Waterfall Hike',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kedarnath-shrine',
    destinationId: 'kedarnath',
    destinationName: 'Kedarnath',
    name: 'Shri Kedarnath Dham Jyotirlinga Temple',
    shortDescription: 'Supreme Himalayan Jyotirlinga of Lord Shiva built of heavy grey granite slabs at 3,584m.',
    detailedDescription: 'One of the twelve revered Jyotirlingas, surrounded by the snowy peaks of Kedarnath dome, Kedar massif, and glaciers.',
    duration: '3 Hours',
    category: 'Jyotirlinga Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kedarnath-bhairavnath',
    destinationId: 'kedarnath',
    destinationName: 'Kedarnath',
    name: 'Bhairavnath Temple Mountain Ridge',
    shortDescription: 'Guarding deity temple perched on a dramatic mountain spur overlooking Kedarnath town.',
    detailedDescription: 'Dedicated to Lord Bhairav, the fierce guardian who protects the sacred valley during the harsh winter months.',
    duration: '1.5 Hours',
    category: 'Hilltop Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kedarnath-gandhi-sarovar',
    destinationId: 'kedarnath',
    destinationName: 'Kedarnath',
    name: 'Chorabari Tal (Gandhi Sarovar) Glacial Lake',
    shortDescription: 'Crystal-clear glacial lake at 3,900m where Mahatma Gandhi’s ashes were immersed in 1948.',
    detailedDescription: 'Trek along the Chorabari glacier moraine offering close-up encounters with towering Himalayan ice walls.',
    duration: '3 Hours',
    category: 'Alpine Glacial Lake',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kedarnath-shankaracharya',
    destinationId: 'kedarnath',
    destinationName: 'Kedarnath',
    name: 'Adi Shankaracharya Samadhi & Statue',
    shortDescription: 'Subterranean memorial and 12-foot black chlorite stone statue of philosopher saint Adi Shankara.',
    detailedDescription: 'Built just behind the Kedarnath temple to commemorate the 8th-century revivalist of Sanatana Dharma.',
    duration: '1 Hour',
    category: 'Sacred Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kedarnath-sonprayag',
    destinationId: 'kedarnath',
    destinationName: 'Kedarnath',
    name: 'Sonprayag & Gaurikund Hot Spring Base',
    shortDescription: 'Holy confluence of Mandakini and Songanga rivers, serving as the starting basecamp for Kedarnath yatra.',
    detailedDescription: 'Bustling transit hub with thermal baths at Gaurikund and pony/palki/helicopter boarding points.',
    duration: '2 Hours',
    category: 'Pilgrimage Trailhead',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gangotri-temple',
    destinationId: 'gangotri',
    destinationName: 'Gangotri',
    name: 'Shri Gangotri Mata Temple & Bhagirathi Ghat',
    shortDescription: 'Pristine 18th-century white granite temple dedicated to Goddess Ganga on the roaring Bhagirathi.',
    detailedDescription: 'Pilgrims attend the sacred evening aarti on the river ghats surrounded by towering deodar and cedar forests.',
    duration: '2 Hours',
    category: 'Sacred Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gangotri-surya-kund',
    destinationId: 'gangotri',
    destinationName: 'Gangotri',
    name: 'Surya Kund & Gauri Kund Waterfalls',
    shortDescription: 'Thunderous waterfalls plunging through deep granite chasms sculpted over millions of years.',
    detailedDescription: 'Spectacular iron bridge overlook where the torrential Bhagirathi river surges with majestic force.',
    duration: '1 Hour',
    category: 'River Chasm & Fall',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gangotri-submerged-shivling',
    destinationId: 'gangotri',
    destinationName: 'Gangotri',
    name: 'Submerged Natural Rock Shivling',
    shortDescription: 'A natural rock formation submerged in water where Lord Shiva received River Ganga in his hair locks.',
    detailedDescription: 'Visible during early winter when water levels recede, demonstrating mythological ties to Bhagiratha’s penance.',
    duration: '45 Minutes',
    category: 'Sacred Natural Relic',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gangotri-bhagirathi-shila',
    destinationId: 'gangotri',
    destinationName: 'Gangotri',
    name: 'Bhagirathi Shila Meditation Rock',
    shortDescription: 'The sacred stone slab near the temple where King Bhagirath meditated to bring Ganga to Earth.',
    detailedDescription: 'Deeply revered pilgrimage platform where special pujas, tarpan, and spiritual rituals are performed.',
    duration: '45 Minutes',
    category: 'Mythological Stone',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gangotri-pandava-gufa',
    destinationId: 'gangotri',
    destinationName: 'Gangotri',
    name: 'Pandava Gufa Meditation Caves',
    shortDescription: 'Natural ancient cave where the five Pandavas are believed to have meditated en route to Swargarohini.',
    detailedDescription: 'Peaceful 1.5 km hike through birch and pine woods on the outskirts of Gangotri town.',
    duration: '1.5 Hours',
    category: 'Ancient Himalayan Cave',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'yamunotri-temple',
    destinationId: 'yamunotri',
    destinationName: 'Yamunotri',
    name: 'Shri Yamunotri Ji Temple & Yamuna Ghat',
    shortDescription: 'Black marble idol of Goddess Yamuna in a shrine built by Maharaja Pratap Shah of Tehri Garhwal.',
    detailedDescription: 'High-altitude mountain shrine perched dramatically against the foot of Kalind Parvat.',
    duration: '2 Hours',
    category: 'Sacred Shrine',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'yamunotri-surya-kund',
    destinationId: 'yamunotri',
    destinationName: 'Yamunotri',
    name: 'Surya Kund Boiling Thermal Spring',
    shortDescription: 'Famous boiling geothermal spring (88°C) named after the Sun god, father of River Yamuna.',
    detailedDescription: 'Devotees tie rice and potatoes in a muslin cloth and dip it into the boiling waters to cook sacred prasad.',
    duration: '1 Hour',
    category: 'Sacred Geothermal Spring',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jim-corbett-dhikala-safari',
    destinationId: 'jim-corbett',
    destinationName: 'Jim Corbett National Park',
    name: 'Dhikala Zone Jeep & Canter Safari',
    shortDescription: 'Core tiger reserve zone with expansive grasslands (Chaurs) and highest Bengal tiger density.',
    detailedDescription: 'The most celebrated zone of Corbett National Park offering panoramic views of the Patli Dun valley, Ramganga reservoir, wild elephant herds, and royal Bengal tigers.',
    duration: '3.5–4 Hours',
    category: 'Wildlife Sanctuary',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jim-corbett-bijrani-safari',
    destinationId: 'jim-corbett',
    destinationName: 'Jim Corbett National Park',
    name: 'Bijrani Zone 4x4 Gypsy Safari',
    shortDescription: 'Famous safari zone renowned for scenic deep sal forests, streams, and frequent tiger sightings.',
    detailedDescription: 'A picturesque wilderness zone with dense mixed vegetation, clear streams, and abundant wildlife including tigers, spotted deer, sambar, and hornbills.',
    duration: '3.5–4 Hours',
    category: 'Wildlife Sanctuary',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jim-corbett-garjiya-devi-temple',
    destinationId: 'jim-corbett',
    destinationName: 'Jim Corbett National Park',
    name: 'Garjiya Devi Temple & Kosi River',
    shortDescription: 'Sacred Shakti shrine perched atop a colossal rock in the middle of the gushing Kosi River.',
    detailedDescription: 'A revered pilgrimage site located on the outskirts of Ramnagar, offering tranquil river vistas and vibrant cultural significance for travelers.',
    duration: '1–1.5 Hours',
    category: 'Historical Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jim-corbett-corbett-falls-museum',
    destinationId: 'jim-corbett',
    destinationName: 'Jim Corbett National Park',
    name: 'Corbett Falls & Heritage Museum',
    shortDescription: 'Scenic 66-ft natural waterfall and the historic heritage bungalow of conservationist Jim Corbett.',
    detailedDescription: 'Nestled in dense teak forests near Kaladhungi, the museum preserves personal artifacts, letters, and memories of legendary hunter-turned-conservationist Jim Corbett.',
    duration: '1.5–2 Hours',
    category: 'Adventure / Nature',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'yamunotri-divya-shila',
    destinationId: 'yamunotri',
    destinationName: 'Yamunotri',
    name: 'Divya Shila Sacred Rock Pillar',
    shortDescription: 'A divine rock slab outside the main temple worshipped before entering the holy shrine.',
    detailedDescription: 'Revered spiritual foundation of Yamunotri where pilgrims offer flowers and prayers for safe travels.',
    duration: '45 Minutes',
    category: 'Mythological Pillar',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'yamunotri-janki-chatti',
    destinationId: 'yamunotri',
    destinationName: 'Yamunotri',
    name: 'Janki Chatti Thermal Bath & Trail Base',
    shortDescription: 'The main starting point for the 6 km Yamunotri trek with natural hot water bathing tanks.',
    detailedDescription: 'Scenic mountain hamlet along the Yamuna river featuring guesthouses, porters, and pony stations.',
    duration: '1.5 Hours',
    category: 'Pilgrimage Basecamp',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'yamunotri-kharsali',
    destinationId: 'yamunotri',
    destinationName: 'Yamunotri',
    name: 'Kharsali Village & Shani Dev Temple',
    shortDescription: 'Ancient multi-tiered wooden temple of Shani Maharaj, winter seat of Goddess Yamuna.',
    detailedDescription: 'Picturesque Himalayan hamlet known for thermal springs, traditional stone architecture, and apricot orchards.',
    duration: '1.5 Hours',
    category: 'Heritage Winter Seat',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hanoi-old-quarter',
    destinationId: 'hanoi',
    destinationName: 'Hanoi',
    name: 'Old Quarter & 36 Guild Streets Cyclo Tour',
    shortDescription: 'Bustling ancient artisan guild quarter with narrow tube houses and street food stalls.',
    detailedDescription: 'Atmospheric medieval heart of Hanoi where streets are named after the goods historically traded there.',
    duration: '2.5 Hours',
    category: 'Historic District',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hanoi-hoan-kiem',
    destinationId: 'hanoi',
    destinationName: 'Hanoi',
    name: 'Hoan Kiem Lake & Ngoc Son Temple',
    shortDescription: 'The "Lake of the Restored Sword" featuring the iconic scarlet wooden Huc Bridge.',
    detailedDescription: 'Tranquil oasis in central Hanoi home to Ngoc Son island temple and legend of the giant golden turtle.',
    duration: '1.5 Hours',
    category: 'Sacred Lake & Temple',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hanoi-temple-literature',
    destinationId: 'hanoi',
    destinationName: 'Hanoi',
    name: 'Temple of Literature (Van Mieu)',
    shortDescription: 'Vietnam’s first national university founded in 1070 dedicated to Confucius.',
    detailedDescription: 'Beautifully preserved ancient courtyards featuring stone stelae of doctoral laureates carried on stone turtles.',
    duration: '1.5 Hours',
    category: 'UNESCO Heritage Academy',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hanoi-ho-chi-minh',
    destinationId: 'hanoi',
    destinationName: 'Hanoi',
    name: 'Ho Chi Minh Mausoleum & One Pillar Pagoda',
    shortDescription: 'Monumental marble resting place of President Ho Chi Minh and the 11th-century lotus pagoda.',
    detailedDescription: 'Grand Ba Dinh Square where independence was proclaimed in 1945, flanked by presidential palace grounds.',
    duration: '2 Hours',
    category: 'Monument & Mausoleum',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hanoi-train-street',
    destinationId: 'hanoi',
    destinationName: 'Hanoi',
    name: 'Hanoi Train Street Cafe Experience',
    shortDescription: 'Famous narrow residential street where passenger trains rumble past cafe doorsteps inches away.',
    detailedDescription: 'Iconic travel thrill sipping Vietnamese egg coffee as the train passes through the narrow urban canyon.',
    duration: '1.5 Hours',
    category: 'Cultural Experience',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'halong-cruise',
    destinationId: 'ha-long-bay',
    destinationName: 'Ha Long Bay',
    name: 'Ha Long Bay Overnight Luxury Cruise & Sunset Party',
    shortDescription: 'Luxury wooden cruise sailing through thousands of limestone karst pillars and hidden lagoons.',
    detailedDescription: 'World Heritage journey featuring cooking demonstrations, squid fishing, tai chi at sunrise, and sea dining.',
    duration: 'Full Day',
    category: 'Cruise & Island Safari',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'halong-sung-sot',
    destinationId: 'ha-long-bay',
    destinationName: 'Ha Long Bay',
    name: 'Sung Sot (Surprise) Cave Stalactite Caverns',
    shortDescription: 'Largest and most spectacular cavern in Ha Long Bay filled with illuminated rock formations.',
    detailedDescription: 'Two enormous chambers accessed by a stone stairway with panoramic views overlooking the anchored flotilla.',
    duration: '1.5 Hours',
    category: 'Limestone Cave',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'halong-titop',
    destinationId: 'ha-long-bay',
    destinationName: 'Ha Long Bay',
    name: 'Ti Top Island Beach & Panoramic Viewpoint',
    shortDescription: 'Crescent white sand beach with a 400-step stone stairway to a 360-degree bay overlook.',
    detailedDescription: 'Named by President Ho Chi Minh after Soviet cosmonaut Gherman Titov, offering premier photos of karst islands.',
    duration: '2 Hours',
    category: 'Beach & Hilltop Lookout',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'halong-luon-cave',
    destinationId: 'ha-long-bay',
    destinationName: 'Ha Long Bay',
    name: 'Luon Cave Kayaking & Bamboo Boat Safari',
    shortDescription: 'Tide-level water tunnel leading into an enclosed emerald lagoon ringed by limestone cliffs.',
    detailedDescription: 'Peaceful paddling through the archway into a secluded lagoon where wild monkeys play on the cliffs.',
    duration: '1.5 Hours',
    category: 'Kayaking & Wildlife',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'danang-golden-bridge',
    destinationId: 'da-nang',
    destinationName: 'Da Nang',
    name: 'Ba Na Hills Cable Car & Golden Hand Bridge',
    shortDescription: 'World-famous 150-meter pedestrian walkway supported by two enormous mossy stone hands.',
    detailedDescription: 'Perched 1,400 meters high in the Truong Son mountains with French chateau villages and record cable cars.',
    duration: '4 Hours',
    category: 'Theme Park & Bridge',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'danang-marble-mountains',
    destinationId: 'da-nang',
    destinationName: 'Da Nang',
    name: 'Marble Mountains (Ngu Hanh Son) & Buddhist Caves',
    shortDescription: 'Cluster of five marble and limestone hills named after the five cosmic elements.',
    detailedDescription: 'Intricate caves housing Buddhist and Hindu shrines, illuminated grottoes, and stone carving artisans.',
    duration: '2.5 Hours',
    category: 'Sacred Mountain Caves',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'danang-dragon-bridge',
    destinationId: 'da-nang',
    destinationName: 'Da Nang',
    name: 'Dragon Bridge Fire & Water Show',
    shortDescription: 'Magnificent 666-meter steel dragon bridge spanning the Han River that breathes fire on weekends.',
    detailedDescription: 'Modern symbol of Da Nang’s prosperity with illuminated LED light cycles and waterfront crowds.',
    duration: '1 Hour',
    category: 'Modern Architectural Landmark',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'danang-my-khe',
    destinationId: 'da-nang',
    destinationName: 'Da Nang',
    name: 'My Khe Beach & Coastal Promenade',
    shortDescription: 'Forbes-rated 30-km stretch of white sand, coconut palm fringes, and gentle ocean surf.',
    detailedDescription: 'Premier urban beachfront ideal for swimming, surfing, fresh seafood restaurants, and sunrise walks.',
    duration: '2 Hours',
    category: 'Beach & Watersports',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'danang-lady-buddha',
    destinationId: 'da-nang',
    destinationName: 'Da Nang',
    name: 'Linh Ung Pagoda & 67m Giant Lady Buddha',
    shortDescription: 'Towering 67-meter white statue of the Goddess of Mercy overlooking Da Nang Bay.',
    detailedDescription: 'Situated on the Son Tra (Monkey) Peninsula featuring Bonsai gardens and sweeping ocean views.',
    duration: '1.5 Hours',
    category: 'Hilltop Buddhist Temple',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hoian-ancient-town',
    destinationId: 'hoi-an',
    destinationName: 'Hoi An',
    name: 'UNESCO Ancient Town Walking Tour',
    shortDescription: 'Enchanting preserved yellow-walled merchant houses, Chinese assembly halls, and silk tailoring.',
    detailedDescription: 'Pedestrian-only historic district glowing with thousands of handcrafted silk lanterns after sunset.',
    duration: '2.5 Hours',
    category: 'Historic Town',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hoian-japanese-bridge',
    destinationId: 'hoi-an',
    destinationName: 'Hoi An',
    name: 'Japanese Covered Bridge (Chua Cau)',
    shortDescription: '16th-century wooden footbridge with a tile roof and Buddhist shrine built by Japanese merchants.',
    detailedDescription: 'Symbol of Hoi An linking the Japanese and Chinese merchant quarters across a canal.',
    duration: '45 Minutes',
    category: 'Historic Bridge',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hoian-thu-bon-lantern',
    destinationId: 'hoi-an',
    destinationName: 'Hoi An',
    name: 'Thu Bon River Sunset Lantern Boat Cruise',
    shortDescription: 'Traditional wooden sampan boat ride releasing floating paper candle lanterns for good fortune.',
    detailedDescription: 'Romantic twilight experience watching the illuminated reflections of lanterns shimmering on the river.',
    duration: '1.5 Hours',
    category: 'River Boat Cruise',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hoian-coconut-forest',
    destinationId: 'hoi-an',
    destinationName: 'Hoi An',
    name: 'Cam Thanh Water Coconut Forest Basket Boat Tour',
    shortDescription: 'Fun bamboo basket boat spinning rides through winding nipa palm water channels.',
    detailedDescription: 'Guided eco-safari with local fishermen demonstrating traditional casting net techniques and folk dances.',
    duration: '2 Hours',
    category: 'Eco Adventure',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hoian-an-bang',
    destinationId: 'hoi-an',
    destinationName: 'Hoi An',
    name: 'An Bang Beach & Seaside Cafes',
    shortDescription: 'Relaxed golden sand beach shaded by thatched umbrella sunbeds just 4 km from Ancient Town.',
    detailedDescription: 'Tranquil escape with beachside seafood bistros, cold coconut refreshments, and views of Cham Islands.',
    duration: '2.5 Hours',
    category: 'Beach & Relaxation',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hcmc-cu-chi',
    destinationId: 'ho-chi-minh-city',
    destinationName: 'Ho Chi Minh City',
    name: 'Cu Chi Underground War Tunnels Excursion',
    shortDescription: 'Legendary 250-km subterranean tunnel network used by Viet Cong guerilla fighters.',
    detailedDescription: 'Hands-on historical complex featuring concealed trap doors, living quarters, weapon workshops, and firing range.',
    duration: '4 Hours',
    category: 'Historical War Relic',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hcmc-war-museum',
    destinationId: 'ho-chi-minh-city',
    destinationName: 'Ho Chi Minh City',
    name: 'War Remnants Museum',
    shortDescription: 'Poignant museum documenting the Vietnam War through photography, military vehicles, and relics.',
    detailedDescription: 'One of the most visited museums in Vietnam featuring outdoor UH-1 helicopters, tanks, and fighter jets.',
    duration: '2 Hours',
    category: 'Historical Museum',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hcmc-post-office',
    destinationId: 'ho-chi-minh-city',
    destinationName: 'Ho Chi Minh City',
    name: 'Saigon Central Post Office & Notre-Dame Basilica',
    shortDescription: 'Classic French colonial masterpiece designed with vaulted iron arches and vintage phone booths.',
    detailedDescription: 'Situated opposite the red-brick Notre-Dame Cathedral in the stately heart of District 1.',
    duration: '1.5 Hours',
    category: 'French Colonial Architecture',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hcmc-ben-thanh',
    destinationId: 'ho-chi-minh-city',
    destinationName: 'Ho Chi Minh City',
    name: 'Ben Thanh Market Shopping & Street Food',
    shortDescription: 'Iconic domed clocktower bazaar packed with local coffee, dried fruit, textiles, and street eats.',
    detailedDescription: 'Vibrant southern market buzzing from day to night with fragrant pho, banh mi, and artisan souvenirs.',
    duration: '2 Hours',
    category: 'Traditional Market',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hcmc-saigon-river',
    destinationId: 'ho-chi-minh-city',
    destinationName: 'Ho Chi Minh City',
    name: 'Saigon River Evening Dinner Cruise',
    shortDescription: 'Scenic night riverboat sailing with live music, Vietnamese dining, and illuminated skyline views.',
    detailedDescription: 'Spectacular panoramas of Landmark 81 and colonial quays as the illuminated city glides past.',
    duration: '2 Hours',
    category: 'Evening River Cruise',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'colombo-gangaramaya',
    destinationId: 'colombo',
    destinationName: 'Colombo',
    name: 'Gangaramaya Buddhist Temple & Beira Lake',
    shortDescription: 'Eclectic temple complex blending Sri Lankan, Thai, and Chinese architecture on Beira Lake.',
    detailedDescription: 'Houses a museum of rare antiques, jewel-encrusted relics, sacred Bodhi tree, and floating assembly hall.',
    duration: '1.5 Hours',
    category: 'Sacred Buddhist Temple',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'colombo-galle-face',
    destinationId: 'colombo',
    destinationName: 'Colombo',
    name: 'Galle Face Green Ocean Promenade',
    shortDescription: 'Expansive 5-hectare ocean-side park where locals gather for kite flying, sunsets, and street food.',
    detailedDescription: 'Colonial oceanside esplanade dating back to 1859, famous for crispy isso wade (shrimp fritters).',
    duration: '2 Hours',
    category: 'Waterfront Promenade',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'colombo-independence',
    destinationId: 'colombo',
    destinationName: 'Colombo',
    name: 'Independence Memorial Hall & Arcade',
    shortDescription: 'Colonial-free national monument built to celebrate Sri Lanka’s independence from British rule.',
    detailedDescription: 'Majestic open pillared hall inspired by the royal audience hall of the Kingdom of Kandy.',
    duration: '1 Hour',
    category: 'National Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'colombo-pettah',
    destinationId: 'colombo',
    destinationName: 'Colombo',
    name: 'Pettah Floating Market & Red Mosque (Jami Ul-Alfar)',
    shortDescription: 'Striking red-and-white candy-striped mosque standing amidst the bustling bazaars of Pettah.',
    detailedDescription: 'Vibrant commercial street market offering electronics, Ceylon tea, spices, gems, and fresh street fruits.',
    duration: '2 Hours',
    category: 'Heritage Market & Mosque',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kandy-tooth-temple',
    destinationId: 'kandy',
    destinationName: 'Kandy',
    name: 'Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)',
    shortDescription: 'The golden-roofed temple housing the sacred tooth relic of Gautama Buddha.',
    detailedDescription: 'Spiritual epicenter of Sri Lanka with daily rituals (thevava) accompanied by temple drummers and oil lamps.',
    duration: '2 Hours',
    category: 'Sacred Buddhist Relic',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kandy-peradeniya',
    destinationId: 'kandy',
    destinationName: 'Kandy',
    name: 'Royal Botanical Gardens Peradeniya',
    shortDescription: 'Sprawling 147-acre royal pleasure garden boasting more than 4,000 species of flora and palm avenues.',
    detailedDescription: 'Famous for its world-class orchid house, giant Javan fig tree, royal palm avenue, and spice garden.',
    duration: '2.5 Hours',
    category: 'Botanical Gardens',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kandy-lake',
    destinationId: 'kandy',
    destinationName: 'Kandy',
    name: 'Kandy Lake Scenic Walk & Viewpoint',
    shortDescription: 'Artificial lake created in 1807 by King Sri Wickrama Rajasinghe, heart of the hill capital.',
    detailedDescription: 'Peaceful stroll along the decorative Cloud Wall (Walakulu Bamma) with views of royal palace pavilions.',
    duration: '1.5 Hours',
    category: 'Scenic Lake',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kandy-cultural-dance',
    destinationId: 'kandy',
    destinationName: 'Kandy',
    name: 'Kandyan Cultural Dance & Fire Walking Show',
    shortDescription: 'Dynamic folk dance spectacle featuring vibrant masks, acrobatic leaps, and daring fire walking.',
    detailedDescription: 'Traditional performance celebrating rituals of the ancient Kandyan kingdom with Geta Beraya drums.',
    duration: '1.5 Hours',
    category: 'Traditional Dance',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nuwara-tea-estate',
    destinationId: 'nuwara-eliya',
    destinationName: 'Nuwara Eliya',
    name: 'Pedro Ceylon Tea Estate & Factory Tour',
    shortDescription: 'Historic working tea factory nestled among emerald slopes where premium Pure Ceylon tea is crafted.',
    detailedDescription: 'Follow the tea plucking and grading process followed by tea tasting on the panoramic factory terrace.',
    duration: '2 Hours',
    category: 'Tea Plantation Tour',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nuwara-gregory-lake',
    destinationId: 'nuwara-eliya',
    destinationName: 'Nuwara Eliya',
    name: 'Lake Gregory Water Sports & Pony Rides',
    shortDescription: 'Picturesque alpine lake constructed in 1873 by Governor Sir William Gregory.',
    detailedDescription: 'Features jet skis, swan pedal boats, horse riding, and lakeside picnic parks with misty mountain air.',
    duration: '2 Hours',
    category: 'Alpine Recreation Lake',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nuwara-horton-plains',
    destinationId: 'nuwara-eliya',
    destinationName: 'Nuwara Eliya',
    name: 'Horton Plains National Park & World\'s End',
    shortDescription: 'Pristine highland plateau terminating in an awe-inspiring sheer 880-meter vertical cliff drop.',
    detailedDescription: 'Features Baker’s Falls, cloud forest dwarf trees, and endemic wildlife including Sambar deer.',
    duration: '4 Hours',
    category: 'UNESCO National Park',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nuwara-ramboda',
    destinationId: 'nuwara-eliya',
    destinationName: 'Nuwara Eliya',
    name: 'Ramboda Falls Cascades & Valley Lookout',
    shortDescription: 'Impressive 109-meter waterfall plunging through lush forested mountains along the Kandy highway.',
    detailedDescription: 'Surrounded by emerald tea estates and mountain mist, accessible via walking trails and viewing decks.',
    duration: '1.5 Hours',
    category: 'Scenic Waterfall',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ella-nine-arches',
    destinationId: 'ella',
    destinationName: 'Ella',
    name: 'Demodara Nine Arches Colonial Railway Bridge',
    shortDescription: 'Stunning 1920s viaduct built entirely of brick, stone, and cement without a single piece of steel.',
    detailedDescription: 'Surrounded by lush tea jungle where blue mountain trains cross high over the forest valley floor.',
    duration: '2 Hours',
    category: 'Architectural Wonder',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ella-little-adams',
    destinationId: 'ella',
    destinationName: 'Ella',
    name: 'Little Adam\'s Peak Mountain Trek',
    shortDescription: 'Gentle zig-zag hike through tea plantations leading to breathtaking 360-degree gorge lookouts.',
    detailedDescription: 'Named after the sacred Adam’s Peak due to identical pyramid peak shapes, offering gorgeous sunset vistas.',
    duration: '2.5 Hours',
    category: 'Panoramic Peak Hike',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ella-ravana-falls',
    destinationId: 'ella',
    destinationName: 'Ella',
    name: 'Ravana Falls Cascades & Caves',
    shortDescription: 'Tiered 25-meter mountain waterfall tied to the epic Ramayana legend of King Ravana.',
    detailedDescription: 'Popular refreshing stop along the Ella-Wellawaya road featuring misty rock pools and cave legends.',
    duration: '1.5 Hours',
    category: 'Waterfall & Mythology',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ella-scenic-train',
    destinationId: 'ella',
    destinationName: 'Ella',
    name: 'Kandy to Ella Scenic Mountain Train Journey',
    shortDescription: 'Widely celebrated as one of the most scenic train journeys in the world through misty tea estates.',
    detailedDescription: 'Wind past eucalyptus forests, cascading waterfalls, cloud-wrapped mountain bridges, and station villages.',
    duration: '4 Hours',
    category: 'World-Famous Train Ride',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sigiriya-rock-fortress',
    destinationId: 'sigiriya',
    destinationName: 'Sigiriya',
    name: 'UNESCO Sigiriya Lion Rock Palace & Frescoes',
    shortDescription: 'Monumental 5th-century rock fortress towering 200m above the jungle, built by King Kashyapa.',
    detailedDescription: 'Ascend past water gardens, ancient female frescoes, mirror walls, and giant carved lion paws to the summit ruins.',
    duration: '3 Hours',
    category: 'Ancient Citadel',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sigiriya-pidurangala',
    destinationId: 'sigiriya',
    destinationName: 'Sigiriya',
    name: 'Pidurangala Rock Sunrise Panoramic Climb',
    shortDescription: 'Adjacent massive rock peak providing unmatched postcard views of the Sigiriya Lion Rock.',
    detailedDescription: 'Enchanting sunrise hike passing a reclining Buddha statue through granite boulders to the open summit.',
    duration: '2.5 Hours',
    category: 'Scenic Sunrise Hike',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sigiriya-dambulla',
    destinationId: 'sigiriya',
    destinationName: 'Sigiriya',
    name: 'Dambulla Royal Golden Rock Cave Temple',
    shortDescription: 'Magnificent monastery complex of five caves containing 153 Buddha statues and ancient murals.',
    detailedDescription: 'Sacred pilgrimage site continuously active for over 22 centuries, dating back to King Valagamba.',
    duration: '2 Hours',
    category: 'UNESCO Rock Cave Temple',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sigiriya-minneriya',
    destinationId: 'sigiriya',
    destinationName: 'Sigiriya',
    name: 'Minneriya National Park Elephant Gathering Safari',
    shortDescription: 'World-famous wildlife phenomenon where hundreds of wild Asian elephants gather around the tank.',
    detailedDescription: 'Open-top 4x4 jeep safari across grassland plains witnessing majestic herds of elephants and birdlife.',
    duration: '3.5 Hours',
    category: 'Wildlife Jeep Safari',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dubai-burj-khalifa',
    destinationId: 'dubai',
    destinationName: 'Dubai City',
    name: 'Burj Khalifa At The Top Observation Deck',
    shortDescription: 'Ascend to levels 124, 125, and 148 of the world’s tallest building at 828 meters.',
    detailedDescription: 'High-speed elevator ride to open-air terraces offering 360-degree panoramas of Dubai, the desert, and Persian Gulf.',
    duration: '2.5 Hours',
    category: 'World Tallest Tower',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dubai-desert-safari',
    destinationId: 'dubai',
    destinationName: 'Dubai City',
    name: 'Desert Safari with Dune Bashing & Bedouin BBQ',
    shortDescription: 'Thrilling 4x4 Land Cruiser dune bashing across golden red dunes followed by Bedouin camp dinner.',
    detailedDescription: 'Includes camel riding, sandboarding, falconry photos, henna art, belly dancing, and tanoura fire shows.',
    duration: '5 Hours',
    category: 'Desert Adventure',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dubai-mall-fountain',
    destinationId: 'dubai',
    destinationName: 'Dubai City',
    name: 'The Dubai Mall & Dubai Fountain Show',
    shortDescription: 'World’s most visited retail and entertainment destination with choreographed fountain jets.',
    detailedDescription: 'Featuring the Dubai Aquarium & Underwater Zoo, Olympic ice rink, luxury fashion avenues, and light shows.',
    duration: '3 Hours',
    category: 'Mega Mall & Fountain',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dubai-marina-cruise',
    destinationId: 'dubai',
    destinationName: 'Dubai City',
    name: 'Dubai Marina Luxury Yacht & Dhow Cruise',
    shortDescription: 'Glide along a 3-km canal framed by glowing residential towers and Ain Dubai Ferris wheel.',
    detailedDescription: 'Buffet dinner and live entertainment as the illuminated mega-skyscrapers of JBR reflect on the water.',
    duration: '2 Hours',
    category: 'Marina Yacht Cruise',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dubai-palm-jumeirah',
    destinationId: 'dubai',
    destinationName: 'Dubai City',
    name: 'Palm Jumeirah & The View at The Palm',
    shortDescription: 'World-famous man-made palm tree island featuring Atlantis The Palm and Aquaventure Waterpark.',
    detailedDescription: '360-degree observation deck at 240 meters high in The Palm Tower revealing the island geometry.',
    duration: '2.5 Hours',
    category: 'Iconic Island Landmark',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dubai-gold-souk',
    destinationId: 'dubai',
    destinationName: 'Dubai City',
    name: 'Gold & Spice Souks & Abra Creek Crossing',
    shortDescription: 'Authentic trading lanes filled with glittering 24-carat gold and aromatic Persian saffron.',
    detailedDescription: 'Take a historic 1-Dirham wooden Abra boat across Dubai Creek between Deira and Bur Dubai heritage districts.',
    duration: '2 Hours',
    category: 'Traditional Bazaar',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'abudhabi-sheikh-zayed',
    destinationId: 'abu-dhabi',
    destinationName: 'Abu Dhabi',
    name: 'Sheikh Zayed Grand Mosque Architectural Tour',
    shortDescription: 'Pure white Macedonian marble marvel with 82 domes, 1,000 pillars, and world’s largest hand-knotted carpet.',
    detailedDescription: 'Illuminated reflecting pools and Swarovski crystal chandeliers blending Mamluk, Ottoman, and Fatimid motifs.',
    duration: '2.5 Hours',
    category: 'Grand Mosque',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'abudhabi-louvre',
    destinationId: 'abu-dhabi',
    destinationName: 'Abu Dhabi',
    name: 'Louvre Abu Dhabi Museum of Civilizations',
    shortDescription: 'Jean Nouvel masterpiece featuring a silver floating dome casting a “rain of light” over sea galleries.',
    detailedDescription: 'Universal museum chronicling human creative achievements from prehistoric artifacts to contemporary masters.',
    duration: '3 Hours',
    category: 'World-Class Museum',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'abudhabi-qasr-al-watan',
    destinationId: 'abu-dhabi',
    destinationName: 'Abu Dhabi',
    name: 'Qasr Al Watan Presidential Palace',
    shortDescription: 'Working presidential palace of white granite showcasing Arab craftsmanship, halls, and light shows.',
    detailedDescription: 'Vast Great Hall adorned with gold leaf, the Presidential Banquet room, and the House of Knowledge library.',
    duration: '2 Hours',
    category: 'Presidential Palace',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'abudhabi-ferrari-world',
    destinationId: 'abu-dhabi',
    destinationName: 'Abu Dhabi',
    name: 'Ferrari World & Formula Rossa Rollercoaster',
    shortDescription: 'World’s first Ferrari-branded theme park on Yas Island home to the world’s fastest rollercoaster (240 km/h).',
    detailedDescription: 'Over 40 record-breaking rides, F1 simulators, and authentic Italian dining under the giant red roof.',
    duration: '4 Hours',
    category: 'Theme Park',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'abudhabi-corniche',
    destinationId: 'abu-dhabi',
    destinationName: 'Abu Dhabi',
    name: 'Abu Dhabi Corniche Beach & Skyline Promenade',
    shortDescription: '8-km manicured waterfront with pedestrian walkways, cycle paths, cafes, and Blue Flag sandy beaches.',
    detailedDescription: 'Scenic view of Emirates Palace and Etihad Towers rising opposite the Arabian Gulf waters.',
    duration: '1.5 Hours',
    category: 'Seaside Promenade',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bali-ubud-monkey',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Ubud Sacred Monkey Forest Sanctuary',
    shortDescription: 'Lush nutmeg forest sanctuary home to over 1,000 Balinese long-tailed macaques and mossy temples.',
    detailedDescription: 'Enchanting sacred reserve representing the harmonious coexistence of people and nature (Tri Hita Karana).',
    duration: '2 Hours',
    category: 'Nature & Wildlife',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bali-tegallalang',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Tegallalang Terraced Rice Fields & Bali Swing',
    shortDescription: 'Famous emerald terraced valleys using the ancient 9th-century Subak cooperative irrigation system.',
    detailedDescription: 'Adrenaline-pumping giant swings soaring high over palm trees and terraced valleys.',
    duration: '2.5 Hours',
    category: 'Scenic Terraces & Swing',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bali-uluwatu',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Uluwatu Cliff Temple & Sunset Kecak Fire Dance',
    shortDescription: 'Ancient sea temple perched on a sheer 70-meter limestone cliff drop above crashing Indian Ocean waves.',
    detailedDescription: 'Hypnotic sunset Kecak choral chant and fire dance dramatizing the Ramayana on the cliff amphitheatre.',
    duration: '3 Hours',
    category: 'Cliff Temple & Dance',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bali-tanah-lot',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Tanah Lot Sunset Ocean Rock Temple',
    shortDescription: 'Iconic 16th-century offshore rock temple accessible on foot only during low ocean tide.',
    detailedDescription: 'Legendary site founded by Dang Hyang Nirartha guarded by sacred sea snakes in underwater caves.',
    duration: '2 Hours',
    category: 'Offshore Rock Temple',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bali-nusa-penida',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Nusa Penida Kelingking T-Rex Beach Safari',
    shortDescription: 'Spectacular cliff formation shaped like a Tyrannosaurus Rex overlooking turquoise waters.',
    detailedDescription: 'Speedboat day trip featuring Broken Beach, Angel’s Billabong natural infinity pool, and Crystal Bay snorkeling.',
    duration: 'Full Day',
    category: 'Island Excursion',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jakarta-monas',
    destinationId: 'jakarta',
    destinationName: 'Jakarta',
    name: 'National Monument (Monas) & Merdeka Square',
    shortDescription: 'Towering 132-meter obelisk topped with a gold-leaf flame symbolizing the fight for independence.',
    detailedDescription: 'Features a historical museum diorama in the base and an elevator lift to the summit observation platform.',
    duration: '1.5 Hours',
    category: 'National Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jakarta-kota-tua',
    destinationId: 'jakarta',
    destinationName: 'Jakarta',
    name: 'Kota Tua Old Batavia Square & Fatahillah Museum',
    shortDescription: 'Dutch colonial cobblestone square with vintage Dutch bicycles and 17th-century town hall.',
    detailedDescription: 'Historic center of VOC spice trade operations in the East Indies with Cafe Batavia and puppet museums.',
    duration: '2 Hours',
    category: 'Colonial Heritage',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jakarta-istiqlal',
    destinationId: 'jakarta',
    destinationName: 'Jakarta',
    name: 'Istiqlal Mosque & Jakarta Cathedral',
    shortDescription: 'Largest mosque in Southeast Asia standing harmoniously opposite the neo-Gothic Catholic cathedral.',
    detailedDescription: 'Connected by the “Tunnel of Tolerance”, demonstrating Indonesia’s national motto: Unity in Diversity.',
    duration: '1.5 Hours',
    category: 'Religious Architecture',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jakarta-taman-mini',
    destinationId: 'jakarta',
    destinationName: 'Jakarta',
    name: 'Taman Mini Indonesia Indah (TMII)',
    shortDescription: 'Culture-based park showcasing traditional pavilions, costumes, and crafts from Indonesia’s 34 provinces.',
    detailedDescription: 'Features a large central lake with miniature Indonesian islands, cable cars, and bird parks.',
    duration: '3 Hours',
    category: 'Cultural Theme Park',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jogja-borobudur',
    destinationId: 'yogyakarta',
    destinationName: 'Yogyakarta',
    name: 'UNESCO Borobudur Sunrise Temple Stupa',
    shortDescription: 'World’s largest Buddhist temple constructed in the 9th century of two million volcanic stone blocks.',
    detailedDescription: 'Nine stacked platforms topped with 72 openwork perforated stupas each housing a seated Buddha statue.',
    duration: '3 Hours',
    category: 'Ancient Buddhist Monument',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jogja-prambanan',
    destinationId: 'yogyakarta',
    destinationName: 'Yogyakarta',
    name: 'UNESCO Prambanan Hindu Temple Complex',
    shortDescription: 'Towering 47-meter spires dedicated to Brahma, Vishnu, and Shiva adorned with Ramayana bas-reliefs.',
    detailedDescription: 'Grandest Hindu temple complex in Indonesia, dating from the Mataram Kingdom in the mid-9th century.',
    duration: '2.5 Hours',
    category: 'Ancient Hindu Temple',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jogja-keraton',
    destinationId: 'yogyakarta',
    destinationName: 'Yogyakarta',
    name: 'Keraton Yogyakarta (Royal Sultan Palace)',
    shortDescription: 'Living royal palace of the Sultan of Yogyakarta reflecting Javanese philosophical architecture.',
    detailedDescription: 'Museum of royal regalia, gamelan instruments, ornate pavilions, and royal courtiers in traditional attire.',
    duration: '2 Hours',
    category: 'Royal Heritage Palace',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jogja-merapi',
    destinationId: 'yogyakarta',
    destinationName: 'Yogyakarta',
    name: 'Mount Merapi 4x4 Lava Tour & Bunker',
    shortDescription: 'Open-top 4x4 classic jeep tour across volcanic sand streams and historic eruption bunkers.',
    detailedDescription: 'Thrilling off-road ride along the slopes of Indonesia’s most active volcano with panoramic peak views.',
    duration: '3 Hours',
    category: 'Volcanic Jeep Adventure',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jogja-malioboro',
    destinationId: 'yogyakarta',
    destinationName: 'Yogyakarta',
    name: 'Malioboro Street Night Market & Batik Artisans',
    shortDescription: 'Famous commercial avenue alive with street musicians, horse-drawn carts (andong), and batik textiles.',
    detailedDescription: 'Sample traditional Javanese Gudeg (jackfruit stew) while browsing handmade leather and silver handicrafts.',
    duration: '2 Hours',
    category: 'Cultural Street & Shopping',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tbilisi-narikala',
    destinationId: 'tbilisi',
    destinationName: 'Tbilisi',
    name: 'Narikala Fortress & Cable Car from Rike Park',
    shortDescription: '4th-century stone fortress commanding breathtaking views over the entire Mtkvari river gorge.',
    detailedDescription: 'Aerial ropeway from modern Rike Park across the river to the fortress walls and Mother of Georgia statue.',
    duration: '2 Hours',
    category: 'Fortress & Panorama',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tbilisi-sulfur-baths',
    destinationId: 'tbilisi',
    destinationName: 'Tbilisi',
    name: 'Abanotubani Royal Sulfur Bath District',
    shortDescription: 'Historic dome-roofed thermal sulfur bathhouses where Tbilisi was founded by King Gorgasali.',
    detailedDescription: 'Traditional kisa scrub massage and hot mineral baths praised by Alexander Dumas and Alexander Pushkin.',
    duration: '1.5 Hours',
    category: 'Thermal Mineral Baths',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tbilisi-sameba',
    destinationId: 'tbilisi',
    destinationName: 'Tbilisi',
    name: 'Holy Trinity Cathedral (Sameba)',
    shortDescription: 'Third-tallest Eastern Orthodox cathedral in the world crowned by a 101-meter golden cross.',
    detailedDescription: 'Grand stone complex on Elia Hill blending traditional Georgian ecclesiastical architecture with marble courtyards.',
    duration: '1.5 Hours',
    category: 'Orthodox Cathedral',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tbilisi-peace-bridge',
    destinationId: 'tbilisi',
    destinationName: 'Tbilisi',
    name: 'Bridge of Peace & Old Town Balcony Walk',
    shortDescription: 'Futuristic glass-and-steel canopy footbridge over the Mtkvari River linking to historic alleys.',
    detailedDescription: 'Stroll past leaning clock towers, carved wooden fretwork balconies, and outdoor Georgian wine bistros.',
    duration: '2 Hours',
    category: 'Architectural Walking Tour',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tbilisi-mtatsminda',
    destinationId: 'tbilisi',
    destinationName: 'Tbilisi',
    name: 'Mtatsminda Funicular & Panoramic Park',
    shortDescription: 'Historic funicular railway climbing 727 meters to the highest park overlooking all of Tbilisi.',
    detailedDescription: 'Enjoy Georgian cheese bread (Khachapuri) on the terrace with sweeping night panoramas.',
    duration: '2 Hours',
    category: 'Hilltop Funicular',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'batumi-ali-nino',
    destinationId: 'batumi',
    destinationName: 'Batumi',
    name: 'Ali and Nino Moving Kinetic Love Statue',
    shortDescription: '8-meter steel kinetic statues of a Muslim Azerbaijani boy and Christian Georgian princess.',
    detailedDescription: 'Statues slowly pass through one another every 10 minutes against the backdrop of the Black Sea sunset.',
    duration: '1 Hour',
    category: 'Contemporary Sculpture',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'batumi-boulevard',
    destinationId: 'batumi',
    destinationName: 'Batumi',
    name: 'Batumi Seaside Boulevard & Ferris Wheel',
    shortDescription: 'Celebrated 7-km coastal park dating back to 1881 lined with modern sculptures and singing fountains.',
    detailedDescription: 'Bicycle paths, subtropical palm trees, beach cafes, and the towering Alphabetic Tower.',
    duration: '2.5 Hours',
    category: 'Coastal Promenade',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'batumi-botanical',
    destinationId: 'batumi',
    destinationName: 'Batumi',
    name: 'Batumi Botanical Garden on Green Cape',
    shortDescription: 'Spectacular 111-hectare botanical reserve cascading down clifftops straight into the Black Sea.',
    detailedDescription: 'Nine biogeographical zones containing over 5,000 species from East Asia, the Mediterranean, and Australia.',
    duration: '3 Hours',
    category: 'Coastal Botanical Garden',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'batumi-piazza',
    destinationId: 'batumi',
    destinationName: 'Batumi',
    name: 'Piazza Square & Italianate Old Town',
    shortDescription: 'Charming square designed in Italian Renaissance style with marble mosaics and stained glass.',
    detailedDescription: 'Live music performances, outdoor cafe dining, and clocktower chimes in the restored historical core.',
    duration: '1.5 Hours',
    category: 'Venetian-style Square',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kazbegi-gergeti',
    destinationId: 'kazbegi',
    destinationName: 'Kazbegi',
    name: 'Gergeti Trinity Church at Mount Kazbek (2,170m)',
    shortDescription: '14th-century church perched isolated on a high mountain plateau beneath Mount Kazbek (5,047m).',
    detailedDescription: 'Georgia’s most famous postcard panorama, accessible by 4x4 or hiking trail through high alpine pastures.',
    duration: '2.5 Hours',
    category: 'Mountain Clifftop Church',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kazbegi-military-highway',
    destinationId: 'kazbegi',
    destinationName: 'Kazbegi',
    name: 'Georgian Military Highway & Russia-Georgia Friendship Arch',
    shortDescription: 'Historic mountain road through the Jvari Pass (2,379m) with dramatic tiled viewpoint balconies.',
    detailedDescription: 'Overlooks the turquoise Devil’s Valley gorge and snow-capped peaks of the Greater Caucasus range.',
    duration: '2 Hours',
    category: 'Scenic Mountain Highway',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kazbegi-ananuri',
    destinationId: 'kazbegi',
    destinationName: 'Kazbegi',
    name: 'Ananuri Fortress & Zhinvali Blue Reservoir',
    shortDescription: '17th-century castle complex of the Dukes of Aragvi overlooking turquoise waters of Zhinvali.',
    detailedDescription: 'Features defensive battlements, carved stone churches, and sweeping views from the central stone keep.',
    duration: '1.5 Hours',
    category: 'Medieval Castle & Reservoir',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kazbegi-dariali',
    destinationId: 'kazbegi',
    destinationName: 'Kazbegi',
    name: 'Dariali Gorge & Gveleti Waterfalls',
    shortDescription: 'Dramatic vertical granite gorge carved by the Terek river on the Russian frontier.',
    detailedDescription: 'Scenic mountain walk leading to the twin upper and lower Gveleti waterfalls hidden in rocky cliff walls.',
    duration: '2 Hours',
    category: 'Mountain Gorge & Waterfall',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almaty-medeu-shymbulak',
    destinationId: 'almaty',
    destinationName: 'Almaty',
    name: 'Medeu High-Altitude Rink & Shymbulak Ski Resort',
    shortDescription: 'World’s highest outdoor ice skating rink at 1,691m connected by cable car to 3,200m peaks.',
    detailedDescription: 'High mountain resort in the Ile-Alatau National Park offering world-class skiing, snowboarding, and summer hikes.',
    duration: '4 Hours',
    category: 'Alpine Mountain Resort',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almaty-kok-tobe',
    destinationId: 'almaty',
    destinationName: 'Almaty',
    name: 'Kok Tobe Cable Car & Panoramic TV Tower View',
    shortDescription: 'Scenic gondola ride to the 1,100m hilltop recreation park overlooking the city of Almaty.',
    detailedDescription: 'Features the world-famous bronze Beatles monument, amusement rides, and panoramic view restaurants.',
    duration: '2 Hours',
    category: 'Mountain Cable Car & Panorama',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almaty-big-lake',
    destinationId: 'almaty',
    destinationName: 'Almaty',
    name: 'Big Almaty Lake (BAO) Glacial Basin',
    shortDescription: 'Turquoise natural alpine reservoir at 2,511 meters flanked by three soaring Tian Shan peaks.',
    detailedDescription: 'Formed by ancient glacial earthquakes, changing colors from light green to deep turquoise throughout the day.',
    duration: '3 Hours',
    category: 'Alpine Glacial Lake',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almaty-zenkov',
    destinationId: 'almaty',
    destinationName: 'Almaty',
    name: 'Zenkov Ascension Cathedral in Panfilov Park',
    shortDescription: 'Second tallest wooden building in the world (56m), constructed entirely without metal nails.',
    detailedDescription: 'Miraculously survived the catastrophic 1911 earthquake, featuring candy-colored domes and gilded iconostasis.',
    duration: '1.5 Hours',
    category: 'Russian Orthodox Wooden Church',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almaty-green-bazaar',
    destinationId: 'almaty',
    destinationName: 'Almaty',
    name: 'Green Bazaar (Zelyony Bazar) Food & Spice Tour',
    shortDescription: 'Authentic Central Asian market filled with horsemeat delicacies (kazy), smoked cheeses (kurt), and apples.',
    detailedDescription: 'Almaty translates to "Father of Apples"; discover wild honey, dried fruits, Korean salads, and spices.',
    duration: '2 Hours',
    category: 'Traditional Market',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'astana-baiterek',
    destinationId: 'astana',
    destinationName: 'Astana',
    name: 'Baiterek Tower Observation Sphere',
    shortDescription: '97-meter monument representing the mythical golden egg of the Samruk bird in the Tree of Life.',
    detailedDescription: 'Golden sphere observation deck with a golden handprint of Kazakhstan’s first president.',
    duration: '1.5 Hours',
    category: 'National Monument',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'astana-khan-shatyr',
    destinationId: 'astana',
    destinationName: 'Astana',
    name: 'Khan Shatyr Giant Transparent Tent',
    shortDescription: '150-meter-high translucent tensile structure designed by Norman Foster, the world’s largest tent.',
    detailedDescription: 'Houses an indoor beach resort with sand imported from the Maldives, botanical gardens, and shopping galleries.',
    duration: '2 Hours',
    category: 'Modern Architectural Marvel',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'astana-peace-pyramid',
    destinationId: 'astana',
    destinationName: 'Astana',
    name: 'Palace of Peace and Reconciliation (The Pyramid)',
    shortDescription: '62-meter high steel pyramid built to host the Congress of Leaders of World and Traditional Religions.',
    detailedDescription: 'Designed by Norman Foster with stained glass doves soaring through the apex atrium.',
    duration: '1.5 Hours',
    category: 'Modern Architecture',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'astana-hazrat-sultan',
    destinationId: 'astana',
    destinationName: 'Astana',
    name: 'Hazrat Sultan Mosque (Largest in Central Asia)',
    shortDescription: 'Magnificent white mosque with four 77-meter minarets accommodating up to 10,000 worshippers.',
    detailedDescription: 'Decorated with traditional Kazakh floral ornaments, white marble courtyards, and crystal chandeliers.',
    duration: '1.5 Hours',
    category: 'Central Asian Grand Mosque',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'astana-nur-alem',
    destinationId: 'astana',
    destinationName: 'Astana',
    name: 'Nur-Alem Future Energy Sphere',
    shortDescription: 'World’s largest spherical building (100m diameter) constructed for the EXPO 2017 world exhibition.',
    detailedDescription: 'Eight-story Museum of Future Energy showcasing solar, wind, kinetic, and space energy innovations.',
    duration: '2 Hours',
    category: 'Futuristic Exhibition Sphere',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tashkent-hazrati-imam',
    destinationId: 'tashkent',
    destinationName: 'Tashkent',
    name: 'Hazrati Imam Complex & Uthman Quran',
    shortDescription: 'Religious center housing the 7th-century Holy Quran of Caliph Uthman on deerskin parchment.',
    detailedDescription: 'Splendid blue mosaic madrasahs, carved sandalwood pillars, and the library of rare Islamic manuscripts.',
    duration: '2 Hours',
    category: 'Islamic Architectural Complex',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tashkent-chorsu',
    destinationId: 'tashkent',
    destinationName: 'Tashkent',
    name: 'Chorsu Bazaar Blue-Domed Market Walk',
    shortDescription: 'Colossal open-air market under an emerald turquoise dome active since the Silk Road era.',
    detailedDescription: 'Sample freshly baked non flatbreads, dried apricots, nuts, and authentic sizzling mutton shashlik.',
    duration: '2 Hours',
    category: 'Silk Road Bazaar',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tashkent-metro',
    destinationId: 'tashkent',
    destinationName: 'Tashkent',
    name: 'Tashkent Metro Palatial Station Tour',
    shortDescription: 'One of the most artistic underground transit systems in the world built like subterranean palaces.',
    detailedDescription: 'Visit Alisher Navoi station with peacock domes, Kosmonavtlar space murals, and carved marble columns.',
    duration: '1.5 Hours',
    category: 'Underground Architecture',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tashkent-amir-timur',
    destinationId: 'tashkent',
    destinationName: 'Tashkent',
    name: 'Amir Timur Square & State Museum of the Timurids',
    shortDescription: 'Monumental equestrian bronze statue of Emperor Timur surrounded by gardens and fountains.',
    detailedDescription: 'Blue-domed museum exhibiting illuminated manuscripts, medieval weapons, and models of architectural gems.',
    duration: '1.5 Hours',
    category: 'Central Plaza & Museum',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samarkand-registan',
    destinationId: 'samarkand',
    destinationName: 'Samarkand',
    name: 'UNESCO Registan Square & Three Madrasahs',
    shortDescription: 'The pinnacle of Islamic architecture: Ulugh Beg, Sher-Dor, and Tilya-Kori madrasahs.',
    detailedDescription: 'Dazzling majolica mosaics, turquoise fluted domes, and gilded ceilings creating the heart of ancient Samarkand.',
    duration: '3 Hours',
    category: 'Islamic Silk Road Square',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samarkand-shah-i-zinda',
    destinationId: 'samarkand',
    destinationName: 'Samarkand',
    name: 'Shah-i-Zinda Avenue of Turquoise Mausoleums',
    shortDescription: 'The "Living King" necropolis containing the most intricate glazed turquoise tilework in the world.',
    detailedDescription: 'Sacred stairway lined with royal tombs of Timur’s family and noble generals spanning the 11th to 15th centuries.',
    duration: '2.5 Hours',
    category: 'Sacred Necropolis',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samarkand-gur-e-amir',
    destinationId: 'samarkand',
    destinationName: 'Samarkand',
    name: 'Gur-e-Amir Mausoleum (Tomb of Tamerlane)',
    shortDescription: 'Imperial tomb of Emperor Amir Timur crowned by a deep azure fluted dome with 64 ribs.',
    detailedDescription: 'Inside lies the dark green nephrite jade cenotaph of Timur beneath an exquisite gilded stalactite dome.',
    duration: '1.5 Hours',
    category: 'Imperial Mausoleum',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samarkand-bibi-khanym',
    destinationId: 'samarkand',
    destinationName: 'Samarkand',
    name: 'Bibi-Khanym Mosque & Siab Bazaar',
    shortDescription: 'Once the largest mosque in the Islamic world with a 40-meter cupola and giant marble Quran stand.',
    detailedDescription: 'Located steps from Siab Bazaar, celebrated for round golden Samarkand bread, almonds, and dried melons.',
    duration: '2 Hours',
    category: 'Monumental Mosque & Market',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samarkand-ulugh-beg',
    destinationId: 'samarkand',
    destinationName: 'Samarkand',
    name: 'Ulugh Beg Astronomical Observatory & Sextant',
    shortDescription: '15th-century astronomical observatory that calculated the length of the solar year to within seconds.',
    detailedDescription: 'Preserves the underground trench of the colossal 40-meter radius curved marble meridian sextant.',
    duration: '1.5 Hours',
    category: 'Ancient Observatory',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bukhara-poi-kalyan',
    destinationId: 'bukhara',
    destinationName: 'Bukhara',
    name: 'UNESCO Po-i-Kalyan Mosque & Kalyan Minaret',
    shortDescription: '48-meter 12th-century brick minaret spared even by Genghis Khan due to its sheer beauty.',
    detailedDescription: 'Framed by the monumental Kalyan Mosque and the Mir-i-Arab Madrasah with its twin turquoise domes.',
    duration: '2.5 Hours',
    category: 'Historic Islamic Center',
    unesco: true,
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bukhara-ark',
    destinationId: 'bukhara',
    destinationName: 'Bukhara',
    name: 'Ark of Bukhara 5th-Century Fortress Palace',
    shortDescription: 'Massive earthen walled city-within-a-city that served as the fortified residence of the Emirs.',
    detailedDescription: 'Houses the coronation court, royal mint, throne room of the Emirs, and historic prison museum.',
    duration: '2 Hours',
    category: 'Royal Fortress',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bukhara-lyabi-hauz',
    destinationId: 'bukhara',
    destinationName: 'Bukhara',
    name: 'Lyabi-Hauz Historic Pond Ensemble & Tea Houses',
    shortDescription: 'Peaceful public pool surrounded by century-old mulberry trees and open-air chaykhana tea terraces.',
    detailedDescription: 'Bordered by the Nadir Divan-begi Madrasah and Khanaka with the whimsical statue of folk hero Nasreddin.',
    duration: '2 Hours',
    category: 'Central Plaza & Tea House',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bukhara-chor-minor',
    destinationId: 'bukhara',
    destinationName: 'Bukhara',
    name: 'Chor Minor Madrasah with Four Turquoise Domes',
    shortDescription: 'Charming 1807 gatehouse with four unique corner towers capped with turquoise ceramic domes.',
    detailedDescription: 'Each of the four decorative minarets is carved with symbols reflecting four world religions.',
    duration: '1 Hour',
    category: 'Unique Madrasah',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bukhara-trading-domes',
    destinationId: 'bukhara',
    destinationName: 'Bukhara',
    name: 'Covered Silk Road Trading Domes (Toqi Sarrofon)',
    shortDescription: 'Medieval multi-domed bazaar intersections constructed at Silk Road crossroads in the 16th century.',
    detailedDescription: 'Explore the Moneychangers’ Dome, Hatmakers’ Dome, and Jewelers’ Dome with handmade suzani embroideries.',
    duration: '2 Hours',
    category: 'Medieval Market Domes',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bishkek-ala-too',
    destinationId: 'bishkek',
    destinationName: 'Bishkek',
    name: 'Ala-Too Square & National Guard Ceremony',
    shortDescription: 'Expansive central plaza with a towering 45m flagpole, Manas monument, and hourly guard mountings.',
    detailedDescription: 'Framed by white marble government edifices, illuminated fountains, and snow-capped Ala-Too mountains.',
    duration: '1.5 Hours',
    category: 'Civic Plaza',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bishkek-osh-bazaar',
    destinationId: 'bishkek',
    destinationName: 'Bishkek',
    name: 'Osh Traditional Central Asian Bazaar',
    shortDescription: 'One of the largest traditional markets in Central Asia bursting with Kyrgyz wool hats (kalpak) and spices.',
    detailedDescription: 'Authentic trading lanes offering dried fruits, kurut, handmade felt carpets (shyrdak), and herbal teas.',
    duration: '2 Hours',
    category: 'Cultural Bazaar',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bishkek-oak-park',
    destinationId: 'bishkek',
    destinationName: 'Bishkek',
    name: 'Oak Park & Open-Air Sculpture Museum',
    shortDescription: 'Centuries-old oak groves in downtown Bishkek adorned with open-air modernist stone sculptures.',
    detailedDescription: 'Pleasant shaded pathways leading to the Red Guard memorial, Russian Drama Theatre, and open art stalls.',
    duration: '1.5 Hours',
    category: 'City Park & Statues',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bishkek-historical-museum',
    destinationId: 'bishkek',
    destinationName: 'Bishkek',
    name: 'Kyrgyz State Historical Museum',
    shortDescription: 'Extensive museum on Ala-Too Square tracing Kyrgyz history from the Bronze Age to the Soviet era.',
    detailedDescription: 'Houses ancient nomadic yurts, golden Saka burial artifacts, petroglyph casts, and ethnographic treasures.',
    duration: '2 Hours',
    category: 'National Museum',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ala-archa-gorge',
    destinationId: 'ala-archa',
    destinationName: 'Ala Archa',
    name: 'Ala Archa Alpine River Valley & Pine Forest Trail',
    shortDescription: 'Pristine national park gorge 40 km from Bishkek with rushing glacial rivers and juniper forests.',
    detailedDescription: 'Gentle walking trails following the river valley floor framed by vertical 4,000-meter jagged granite peaks.',
    duration: '3 Hours',
    category: 'Mountain Nature Trail',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ala-archa-ak-sai',
    destinationId: 'ala-archa',
    destinationName: 'Ala Archa',
    name: 'Ak-Sai Glacier Viewpoint & Waterfall Hike',
    shortDescription: 'Exhilarating alpine trek climbing to a 35-meter gushing waterfall and Ak-Sai glacier moraine.',
    detailedDescription: 'Offers close encounters with mountain ibex, marmots, and panoramic amphitheaters of permanent ice.',
    duration: '4 Hours',
    category: 'Glacial Alpine Hike',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ala-archa-broken-heart',
    destinationId: 'ala-archa',
    destinationName: 'Ala Archa',
    name: 'Broken Heart Rock Vantage Point',
    shortDescription: 'A dramatic red cleft rock ridge offering a bird’s-eye perspective of the entire alpine gorge.',
    detailedDescription: 'Popular photography point overlooking the winding canyon and dense juniper (archa) covered slopes.',
    duration: '2 Hours',
    category: 'Mountain Lookout',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'issyk-kul-lake',
    destinationId: 'issyk-kul',
    destinationName: 'Issyk-Kul',
    name: 'Lake Issyk-Kul Beach & Alpine Mountain Panorama',
    shortDescription: 'Second-largest alpine lake in the world at 1,607m, surrounded by snow-capped Tian Shan ranges.',
    detailedDescription: 'Crystal-clear saline waters that never freeze even in harsh winters, with golden sandy beaches.',
    duration: '3 Hours',
    category: 'Alpine Lake Beach',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'issyk-kul-skazka',
    destinationId: 'issyk-kul',
    destinationName: 'Issyk-Kul',
    name: 'Skazka (Fairy Tale) Red Sandstone Canyon',
    shortDescription: 'Surreal labyrinth of red, orange, and yellow clay formations resembling castles and dragons.',
    detailedDescription: 'Sculpted by centuries of wind and water erosion overlooking the contrasting deep blue waters of the lake.',
    duration: '2.5 Hours',
    category: 'Red Sandstone Canyon',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'issyk-kul-petroglyphs',
    destinationId: 'issyk-kul',
    destinationName: 'Issyk-Kul',
    name: 'Cholpon-Ata Ancient Open-Air Petroglyphs Museum',
    shortDescription: '42-hectare field of glacial boulders carved with drawings of ibex, wolves, and hunters (800 BC).',
    detailedDescription: 'Ancient Saka-Usun open-air temple oriented toward the rising sun with mountain panoramas.',
    duration: '1.5 Hours',
    category: 'Ancient Rock Carvings',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'issyk-kul-ruh-ordo',
    destinationId: 'issyk-kul',
    destinationName: 'Issyk-Kul',
    name: 'Ruh Ordo Cultural Complex of World Religions',
    shortDescription: 'Lakefront spiritual park featuring five chapels representing the five major world religions.',
    detailedDescription: 'Dedicated to unity and mutual understanding, honoring Kyrgyz writer Chingiz Aitmatov.',
    duration: '2 Hours',
    category: 'Cultural Lakefront Complex',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'issyk-kul-gorges',
    destinationId: 'issyk-kul',
    destinationName: 'Issyk-Kul',
    name: 'Grigorievskoye & Semenovskoye Alpine Gorges',
    shortDescription: 'Scenic valleys of rushing mountain streams, spruce forests, and nomad yurts serving fermented mare’s milk (kymyz).',
    detailedDescription: 'Horseriding, eagle hunting demonstrations, and trout fishing in crystal-clear alpine waters.',
    duration: '3.5 Hours',
    category: 'Alpine Mountain Gorges',
    unesco: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  }
];

// Helper: Common Driving Distances & Times between cities
export const INTERCITY_ROUTES: Record<string, { distanceKm: number; driveTime: string; routeVia?: string }> = {
  'delhi-jim-corbett': { distanceKm: 245, driveTime: '5–6 Hours', routeVia: 'NH 9 & Moradabad Bypass' },
  'jim-corbett-delhi': { distanceKm: 245, driveTime: '5–6 Hours', routeVia: 'NH 9' },
  'nainital-jim-corbett': { distanceKm: 65, driveTime: '2 Hours', routeVia: 'Kaladhungi - Ramnagar Road' },
  'jim-corbett-nainital': { distanceKm: 65, driveTime: '2 Hours', routeVia: 'Kaladhungi Road' },
  'haridwar-jim-corbett': { distanceKm: 130, driveTime: '3.5 Hours', routeVia: 'NH 74 via Kashipur' },
  'jim-corbett-haridwar': { distanceKm: 130, driveTime: '3.5 Hours', routeVia: 'NH 74' },
  'rishikesh-jim-corbett': { distanceKm: 145, driveTime: '4 Hours', routeVia: 'NH 74' },
  'jim-corbett-rishikesh': { distanceKm: 145, driveTime: '4 Hours', routeVia: 'NH 74' },
  'dehradun-jim-corbett': { distanceKm: 175, driveTime: '4.5 Hours', routeVia: 'NH 74 via Haridwar & Kashipur' },
  'jim-corbett-dehradun': { distanceKm: 175, driveTime: '4.5 Hours', routeVia: 'NH 74' },
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
  'udaipur-mount-abu': { distanceKm: 160, driveTime: '3 Hours', routeVia: 'NH 27' },
  'mount-abu-udaipur': { distanceKm: 160, driveTime: '3 Hours', routeVia: 'NH 27' },
  'jaipur-mount-abu': { distanceKm: 490, driveTime: '8.5 Hours', routeVia: 'NH 48 & NH 27' },
  'mount-abu-jaipur': { distanceKm: 490, driveTime: '8.5 Hours', routeVia: 'NH 48 & NH 27' },
  'jodhpur-mount-abu': { distanceKm: 260, driveTime: '4.5 Hours', routeVia: 'NH 62' },
  'mount-abu-jodhpur': { distanceKm: 260, driveTime: '4.5 Hours', routeVia: 'NH 62' },
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
  'mumbai-goa': { distanceKm: 590, driveTime: '10–11 Hours', routeVia: 'Mumbai-Goa Coastal Highway NH 66' },
  'delhi-dehradun': { distanceKm: 245, driveTime: '4.5–5 Hours', routeVia: 'Delhi-Dehradun Expressway' },
  'dehradun-delhi': { distanceKm: 245, driveTime: '4.5–5 Hours', routeVia: 'Delhi-Dehradun Expressway' },
  'dehradun-mussoorie': { distanceKm: 35, driveTime: '1–1.5 Hours', routeVia: 'Mussoorie Road via Rajpur' },
  'mussoorie-dehradun': { distanceKm: 35, driveTime: '1–1.5 Hours', routeVia: 'Mussoorie Road via Rajpur' },
  'rishikesh-dehradun': { distanceKm: 45, driveTime: '1 Hour', routeVia: 'Rishikesh-Dehradun Highway via Ranipokhari' },
  'dehradun-rishikesh': { distanceKm: 45, driveTime: '1 Hour', routeVia: 'Rishikesh-Dehradun Highway' },
  'haridwar-dehradun': { distanceKm: 52, driveTime: '1.2 Hours', routeVia: 'NH 34' },
  'dehradun-haridwar': { distanceKm: 52, driveTime: '1.2 Hours', routeVia: 'NH 34' },
  'delhi-nainital': { distanceKm: 310, driveTime: '6.5–7 Hours', routeVia: 'NH 9 via Moradabad & Haldwani' },
  'nainital-delhi': { distanceKm: 310, driveTime: '6.5–7 Hours', routeVia: 'NH 9 via Moradabad' },
  'haridwar-nainital': { distanceKm: 235, driveTime: '5.5 Hours', routeVia: 'NH 74' },
  'nainital-haridwar': { distanceKm: 235, driveTime: '5.5 Hours', routeVia: 'NH 74' },
  'rishikesh-badrinath': { distanceKm: 295, driveTime: '9–10 Hours', routeVia: 'All-Weather Chardham Highway NH 7' },
  'badrinath-rishikesh': { distanceKm: 295, driveTime: '9–10 Hours', routeVia: 'NH 7' },
  'rishikesh-kedarnath': { distanceKm: 215, driveTime: '7–8 Hours', routeVia: 'NH 107 via Rudraprayag' },
  'kedarnath-rishikesh': { distanceKm: 215, driveTime: '7–8 Hours', routeVia: 'NH 107' },
  'kedarnath-badrinath': { distanceKm: 218, driveTime: '7.5 Hours', routeVia: 'Chopta / Ukhimath Scenic Route' },
  'badrinath-kedarnath': { distanceKm: 218, driveTime: '7.5 Hours', routeVia: 'Chopta' },
  'gangotri-yamunotri': { distanceKm: 225, driveTime: '7–8 Hours', routeVia: 'Uttarkashi - Dharasu' },
  'yamunotri-gangotri': { distanceKm: 225, driveTime: '7–8 Hours', routeVia: 'Uttarkashi - Dharasu' },
  'dubai-abu-dhabi': { distanceKm: 140, driveTime: '1.5 Hours', routeVia: 'Sheikh Zayed Road E11' },
  'abu-dhabi-dubai': { distanceKm: 140, driveTime: '1.5 Hours', routeVia: 'Sheikh Zayed Road E11' },
  'hanoi-ha-long-bay': { distanceKm: 155, driveTime: '2.5 Hours', routeVia: 'Hanoi-Hai Phong Expressway' },
  'ha-long-bay-hanoi': { distanceKm: 155, driveTime: '2.5 Hours', routeVia: 'Expressway' },
  'da-nang-hoi-an': { distanceKm: 30, driveTime: '45 Minutes', routeVia: 'Coastal Highway' },
  'hoi-an-da-nang': { distanceKm: 30, driveTime: '45 Minutes', routeVia: 'Coastal Highway' },
  'colombo-kandy': { distanceKm: 115, driveTime: '3 Hours', routeVia: 'Central Expressway' },
  'kandy-colombo': { distanceKm: 115, driveTime: '3 Hours', routeVia: 'Central Expressway' },
  'kandy-nuwara-eliya': { distanceKm: 75, driveTime: '2.5 Hours', routeVia: 'A5 Highlands Highway' },
  'nuwara-eliya-kandy': { distanceKm: 75, driveTime: '2.5 Hours', routeVia: 'A5' },
  'nuwara-eliya-ella': { distanceKm: 55, driveTime: '2 Hours', routeVia: 'A5 via Welimada' },
  'ella-nuwara-eliya': { distanceKm: 55, driveTime: '2 Hours', routeVia: 'A5' },
  'colombo-sigiriya': { distanceKm: 175, driveTime: '4 Hours', routeVia: 'Ambepussa - Kurunegala Highway' },
  'sigiriya-kandy': { distanceKm: 90, driveTime: '2.5 Hours', routeVia: 'Matale Road' },
  'tashkent-samarkand': { distanceKm: 300, driveTime: '4 Hours / 2h Afrosiyob Train', routeVia: 'M39 Highway' },
  'samarkand-bukhara': { distanceKm: 275, driveTime: '3.5 Hours / 1.5h Train', routeVia: 'M37 Silk Road Highway' },
  'bukhara-samarkand': { distanceKm: 275, driveTime: '3.5 Hours', routeVia: 'M37' },
  'almaty-astana': { distanceKm: 1200, driveTime: 'Flight 1.5 Hours', routeVia: 'Domestic Flight / Talgo Train' },
  'bishkek-ala-archa': { distanceKm: 42, driveTime: '50 Minutes', routeVia: 'Ala Archa National Park Road' },
  'bishkek-issyk-kul': { distanceKm: 260, driveTime: '3.5–4 Hours', routeVia: 'Boom Gorge Highway A365' },
  'issyk-kul-bishkek': { distanceKm: 260, driveTime: '3.5–4 Hours', routeVia: 'Boom Gorge Highway A365' },
  'tbilisi-batumi': { distanceKm: 375, driveTime: '5 Hours / 5h Stadler Train', routeVia: 'E60 Highway' },
  'tbilisi-kazbegi': { distanceKm: 155, driveTime: '3 Hours', routeVia: 'Georgian Military Highway' }
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
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-udaipur',
    name: 'City Palace & Lake Pichola',
    destination: 'Udaipur',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cov-mount-abu',
    name: 'Nakki Lake & Aravalli Hills',
    destination: 'Mount Abu',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg'
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

  'delhi-rashtrapati-parliament': 'https://images.pexels.com/photos/3881113/pexels-photo-3881113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'rashtrapati bhavan and parliament': 'https://images.pexels.com/photos/3881113/pexels-photo-3881113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'rashtrapati bhavan': 'https://images.pexels.com/photos/3881113/pexels-photo-3881113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

  'delhi-national-war-memorial': 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Newly_inaugurated_National_War_Memorial_New_Delhi.jpg',
  'national war memorial': 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Newly_inaugurated_National_War_Memorial_New_Delhi.jpg',

  'delhi-indira-gandhi-memorial': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Indira_Gandhi_Memorial_Museum.jpg',
  'indira gandhi memorial museum': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Indira_Gandhi_Memorial_Museum.jpg',

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
  'fs-buland-darwaza': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',
  'buland darwaza': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',
  'buland darwaza & sheikh salim chishti shrine': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TMPYIz4AjWKkpA3pBtTf2SElQZU-Bw65sN081xs_mJC0ejrB_NPUqTUoP2MVZoK0Ywz2239TfFthjRLuE3ZD4Uem4sAO9mOQxKG37BByvXS6GAw5igEodf3AvccmrRpB61JvQ4=s1360-w1360-h1020-rw',

  'fs-panch-mahal': 'https://images.unsplash.com/photo-1742303300027-a4c32eafe389?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'panch mahal': 'https://images.unsplash.com/photo-1742303300027-a4c32eafe389?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'fs-jodha-bai-palace': 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',
  "jodha bai's palace": 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',
  "joda bai's palace": 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',
  "jodha bai palace": 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TBx36_Jb3ayLeo71J_lW7kABul7lXgXazWV8NjkEQgZZg1OuFiNGmkGa-QTiRUa3W7mY54XpUZ6ZLCu3fST_bCbQqF2AHlbrxMNQsH31BLdKDuCRRug3O9ZsXxbOsC7H9CteE=s1360-w1360-h1020-rw',

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

  'jaipur-chokhi-dhani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg/1280px-Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg',
  'choki dhani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg/1280px-Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg',
  'chokhi dhani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg/1280px-Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg',
  'chokhi dhani ethnic cultural village': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg/1280px-Kathputli_%28Puppet_Dance%29_in_Rajasthan.jpg',

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

  // Mount Abu & Udaipur Excursion
  'udaipur-mount-abu-excursion': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',
  'mount abu day excursion': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',
  'mount abu day excursion (dilwara temples & nakki lake)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',
  'mount-abu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg',
  'mount abu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg',

  'mount-abu-dilwara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',
  'dilwara jain temples': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',
  'dilwara temples': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',
  'dilwara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg/1280px-Marble_Carved_Ceilings_Showing_Jain_Mythology_in_Dilwara_Temple%2C_Mt._Abu.jpg',

  'mount-abu-nakki-lake': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg',
  'nakki lake': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg',
  'nakki lake & toad rock': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg/1280px-Mt_Abu%27s_Nakki_Lake_During_Sunset.jpg',

  'mount-abu-guru-shikhar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Guru_shikhar_-_mount_abu.jpg/1280px-Guru_shikhar_-_mount_abu.jpg',
  'guru shikhar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Guru_shikhar_-_mount_abu.jpg/1280px-Guru_shikhar_-_mount_abu.jpg',
  'guru shikhar & sunset point': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Guru_shikhar_-_mount_abu.jpg/1280px-Guru_shikhar_-_mount_abu.jpg',
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

  'manali-atal-tunnel': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg/1280px-Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg',
  'atal tunnel': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg/1280px-Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg',
  'atal tunnel entrance': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg/1280px-Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg',
  'atal tunnel & sissu waterfall': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg/1280px-Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg',
  'atal tunnel & sissu waterfall (lahaul valley)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg/1280px-Atal_Tunnel_Entrance_%28South_Portal%29%2C_Manali.jpg',

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
  'jaipur-jhalana-safari': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg',
  'jhalana leopard safari': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg',
  'jhalana safari': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg',
  'jhalana': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg',

  // Mussoorie - Kempty Falls
  'mussoorie-kempty-falls': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Kempty_Falls_Mussoorie_2.jpg/1280px-Kempty_Falls_Mussoorie_2.jpg',
  'kempty falls': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Kempty_Falls_Mussoorie_2.jpg/1280px-Kempty_Falls_Mussoorie_2.jpg',
  'kempty falls cascades': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Kempty_Falls_Mussoorie_2.jpg/1280px-Kempty_Falls_Mussoorie_2.jpg',

  // Nainital
  'nainital-naini-lake': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg/1280px-Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg',
  'naini lake': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg/1280px-Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg',
  'naini lake boating & promenade': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg/1280px-Boat_riding_in_Naini_Lake_at_Nainital%2C_Uttarkhand%2C_India.jpg',
  'nainital-naina-devi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg',
  'naina devi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg',
  'naina devi temple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg',
  'maa naina devi temple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg/1280px-Maa_Naina_Devi_Temple%2C_Nainital%2C_Uttarakhand%2C_India.jpg',
  'nainital-snow-view': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/View_of_Nainital_from_Snow_View_Point.jpg/1280px-View_of_Nainital_from_Snow_View_Point.jpg',
  'snow view': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/View_of_Nainital_from_Snow_View_Point.jpg/1280px-View_of_Nainital_from_Snow_View_Point.jpg',
  'snow view point': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/View_of_Nainital_from_Snow_View_Point.jpg/1280px-View_of_Nainital_from_Snow_View_Point.jpg',
  'snow view point aerial ropeway': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/View_of_Nainital_from_Snow_View_Point.jpg/1280px-View_of_Nainital_from_Snow_View_Point.jpg',
  'nainital-tiffin-top': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tiffin-top_Nainital.jpg/1280px-Tiffin-top_Nainital.jpg',
  'tiffin top': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tiffin-top_Nainital.jpg/1280px-Tiffin-top_Nainital.jpg',
  "dorothy's seat": 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tiffin-top_Nainital.jpg/1280px-Tiffin-top_Nainital.jpg',
  'nainital-eco-cave': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cave_park%2C_Nainital_2.jpg/1280px-Cave_park%2C_Nainital_2.jpg',
  'eco cave': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cave_park%2C_Nainital_2.jpg/1280px-Cave_park%2C_Nainital_2.jpg',
  'eco cave gardens': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cave_park%2C_Nainital_2.jpg/1280px-Cave_park%2C_Nainital_2.jpg',
  'nainital-mall-road': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nainital%2C_Mall_Road.jpg/1280px-Nainital%2C_Mall_Road.jpg',
  'mall road nainital': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nainital%2C_Mall_Road.jpg/1280px-Nainital%2C_Mall_Road.jpg',
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

