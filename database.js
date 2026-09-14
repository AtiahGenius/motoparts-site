/* =========================================================
  Motify - database.js
   Mock data layer, persisted to localStorage so state
   survives navigation between pages. Seeds itself on first run.
   ========================================================= */

const DB_KEY = "kmp_db_v1";

const CATEGORIES = ["Engine","Brake System","Transmission","Electrical","Body Components","Tyres/Wheels","Accessories"];
const MODELS = ["Bajaj Boxer 150","TVS HLX 125","Royal 125","Haojue DK150","Apsonic AP150"];
const PART_IMAGES = {
  "Engine":"https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=85",
  "Brake System":"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
  "Transmission":"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=85",
  "Electrical":"https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=85",
  "Body Components":"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
  "Tyres/Wheels":"https://images.unsplash.com/photo-1558980394-0c4a8cc0f0f5?auto=format&fit=crop&w=900&q=85",
  "Accessories":"https://images.unsplash.com/photo-1558981033-0f0309284409?auto=format&fit=crop&w=900&q=85"
};
const STATUS_FLOW = ["pending","confirmed","ready_for_pickup","completed"];
const STATUS_LABEL = {pending:"Pending confirmation", confirmed:"Confirmed", ready_for_pickup:"Ready for pickup", completed:"Completed", cancelled:"Cancelled"};
const STATUS_BADGE = {pending:"badge-pending", confirmed:"badge-pending", ready_for_pickup:"badge-ready", completed:"badge-completed", cancelled:"badge-cancelled"};

function seedData(){
  const shops = [
    {id:"s1", name:"Adjei Bike Spares", ownerName:"Kofi Adjei", ownerPhone:"024 411 2290",
      landmark:"Near Kwabenya Roundabout, opposite Shell Station", lat:5.6875, lng:-0.2015,
      opening:"07:00", closing:"18:30", days:"Mon-Sat",
      mechanicName:"Yaw Boateng", mechanicPhone:"054 902 7731", mechanicSpec:"Engine & transmission",
      verified:true, rating:4.9, reviewCount:18, zone:"Atomic Junction end"},
    {id:"s2", name:"Kwabenya Auto & Moto Parts", ownerName:"Efua Asante", ownerPhone:"020 773 4102",
      landmark:"Taifa-Kwabenya road, near GCB Bank", lat:5.6931, lng:-0.1988,
      opening:"08:00", closing:"19:00", days:"Mon-Sat",
      mechanicName:"Ibrahim Sule", mechanicPhone:"050 118 4423", mechanicSpec:"Electrical systems",
      verified:true, rating:4.7, reviewCount:12, zone:"Taifa border"},
    {id:"s3", name:"Roundabout Rider Depot", ownerName:"Nana Osei", ownerPhone:"027 665 9012",
      landmark:"200m from Ashesi/Berekuso junction", lat:5.7502, lng:-0.2159,
      opening:"07:30", closing:"17:00", days:"Mon-Sat",
      mechanicName:"Mustapha Alhassan", mechanicSpec:"Brakes & tyres", mechanicPhone:"055 340 8871",
      verified:false, rating:4.3, reviewCount:6, zone:"Ashesi/Berekuso road axis"},
    {id:"s4", name:"Okada Point Spares", ownerName:"Abena Frimpong", ownerPhone:"026 501 7789",
      landmark:"Behind Kwabenya Police Station", lat:5.6858, lng:-0.2041,
      opening:"06:30", closing:"18:00", days:"Mon-Sun",
      mechanicName:"Yaw Boateng Jr.", mechanicPhone:"024 887 2210", mechanicSpec:"General fitting",
      verified:true, rating:4.8, reviewCount:9, zone:"Atomic Junction end"},
  ];
  const products = [
    {id:"p1", shopId:"s1", title:"Front brake pad set", category:"Brake System", models:["Bajaj Boxer 150","TVS HLX 125"], price:85, stock:12, desc:"OEM-spec sintered pads, direct fit. Sold as a pair.", available:true},
    {id:"p2", shopId:"s1", title:"Drive chain, 428H, 120L", category:"Transmission", models:["Bajaj Boxer 150","Haojue DK150"], price:180, stock:6, desc:"Heavy-duty O-ring chain, pre-stretched.", available:true},
    {id:"p3", shopId:"s1", title:"CDI ignition unit", category:"Electrical", models:["Bajaj Boxer 150"], price:150, stock:3, desc:"Direct replacement CDI module, plug and play.", available:true},
    {id:"p4", shopId:"s2", title:"Headlamp assembly", category:"Electrical", models:["TVS HLX 125"], price:220, stock:4, desc:"Complete headlamp housing with bulb socket.", available:true},
    {id:"p5", shopId:"s2", title:"Rear shock absorber (pair)", category:"Body Components", models:["TVS HLX 125","Royal 125"], price:340, stock:5, desc:"Adjustable preload, gas-charged.", available:true},
    {id:"p6", shopId:"s2", title:"Spark plug (standard)", category:"Engine", models:["TVS HLX 125","Bajaj Boxer 150","Royal 125"], price:20, stock:40, desc:"Standard heat-range plug, sold individually.", available:true},
    {id:"p7", shopId:"s3", title:"Rear tyre, 3.00-17", category:"Tyres/Wheels", models:["Royal 125","Bajaj Boxer 150"], price:260, stock:8, desc:"6-ply rated, tube type, all-terrain tread.", available:true},
    {id:"p8", shopId:"s3", title:"Brake shoe set (rear drum)", category:"Brake System", models:["Royal 125"], price:65, stock:0, desc:"Riveted lining, drum diameter 130mm.", available:false},
    {id:"p9", shopId:"s3", title:"Handlebar grip set", category:"Accessories", models:["Royal 125","Apsonic AP150"], price:30, stock:20, desc:"Anti-slip rubber, universal 7/8in fit.", available:true},
    {id:"p10", shopId:"s4", title:"Engine oil, 20W-50 (1L)", category:"Engine", models:["Bajaj Boxer 150","TVS HLX 125","Haojue DK150","Royal 125","Apsonic AP150"], price:45, stock:30, desc:"Semi-synthetic, suitable for 4-stroke motorcycle engines.", available:true},
    {id:"p11", shopId:"s4", title:"Clutch cable", category:"Transmission", models:["Bajaj Boxer 150"], price:35, stock:15, desc:"Direct-fit clutch cable, pre-lubricated.", available:true},
    {id:"p12", shopId:"s4", title:"Side mirror pair", category:"Accessories", models:["Bajaj Boxer 150","TVS HLX 125","Royal 125"], price:40, stock:18, desc:"Universal mount, folding type.", available:true},
  ];
  const reservations = [
    {id:"r1", riderId:"rider1", productId:"p1", shopId:"s1", qty:1, total:85, status:"pending", notes:"Need it before 5pm today.", createdAt: Date.now()-3600e3},
    {id:"r2", riderId:"rider1", productId:"p10", shopId:"s4", qty:2, total:90, status:"ready_for_pickup", notes:"", createdAt: Date.now()-86400e3},
    {id:"r3", riderId:"rider2", productId:"p4", shopId:"s2", qty:1, total:220, status:"completed", notes:"", createdAt: Date.now()-3*86400e3},
    {id:"r4", riderId:"rider3", productId:"p2", shopId:"s1", qty:1, total:180, status:"confirmed", notes:"Calling ahead.", createdAt: Date.now()-7200e3},
  ];
  const contactLog = [
    {id:"c1", shopId:"s1", type:"call", productTitle:"Front brake pad set", riderName:"Kwame M.", when:Date.now()-1800e3},
    {id:"c2", shopId:"s1", type:"directions", productTitle:"CDI ignition unit", riderName:"Yaw A.", when:Date.now()-5000e3},
    {id:"c3", shopId:"s1", type:"call", productTitle:"Drive chain, 428H, 120L", riderName:"Ama K.", when:Date.now()-9000e3},
  ];
  const users = [
    {id:"rider1", name:"Kwame Mensah", role:"rider", phone:"024 555 1010", garage:[{make:"Bajaj",model:"Bajaj Boxer 150",year:2021,cc:150}], favorites:["s1","s4"]},
    {id:"rider2", name:"Yaw Antwi", role:"rider", phone:"055 222 3030", garage:[], favorites:[]},
    {id:"rider3", name:"Ama Konadu", role:"rider", phone:"050 333 4040", garage:[], favorites:[]},
    {id:"vendor1", name:"Kofi Adjei", role:"vendor", phone:"024 411 2290", shopId:"s1"},
    {id:"vendor2", name:"Efua Asante", role:"vendor", phone:"020 773 4102", shopId:"s2"},
    {id:"admin1", name:"Platform Admin", role:"admin", phone:"030 000 0000"},
  ];
  const reviews = [
    {id:"review1", shopId:"s1", author:"Kwame Mensah", rating:5, text:"The brake pads matched my Boxer and the fitter helped me install them quickly.", createdAt:Date.now()-86400e3},
    {id:"review2", shopId:"s1", author:"Ama Konadu", rating:5, text:"Clear directions and the part was ready when I arrived.", createdAt:Date.now()-3*86400e3},
    {id:"review3", shopId:"s2", author:"Yaw Antwi", rating:4, text:"Good selection and helpful advice on the right plug for my bike.", createdAt:Date.now()-5*86400e3}
  ];
  return { shops, products, reservations, contactLog, users, reviews, nextId:100 };
}

function loadDB(){
  try{
    const raw = localStorage.getItem(DB_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){ /* fall through to reseed */ }
  const seeded = seedData();
  localStorage.setItem(DB_KEY, JSON.stringify(seeded));
  return seeded;
}
function saveDB(db){ localStorage.setItem(DB_KEY, JSON.stringify(db)); }
function resetDB(){ localStorage.setItem(DB_KEY, JSON.stringify(seedData())); }

const DB = {
  all(){ return loadDB(); },

  // ---- shops ----
  getShops(){ return loadDB().shops; },
  getShopById(id){ return loadDB().shops.find(s=>s.id===id); },
  getReviews(shopId){ return (loadDB().reviews || []).filter(review=>review.shopId===shopId).sort((a,b)=>b.createdAt-a.createdAt); },
  addReview(review){
    const db = loadDB();
    db.reviews = db.reviews || [];
    const id = "review"+(db.nextId++);
    const newReview = {id, createdAt:Date.now(), ...review};
    db.reviews.unshift(newReview);
    const shop = db.shops.find(item=>item.id===review.shopId);
    if(shop){
      const shopReviews = db.reviews.filter(item=>item.shopId===review.shopId);
      shop.reviewCount = shopReviews.length;
      shop.rating = Number((shopReviews.reduce((total,item)=>total + Number(item.rating),0) / shopReviews.length).toFixed(1));
    }
    saveDB(db);
    return id;
  },
  updateShop(id, patch){
    const db = loadDB();
    const s = db.shops.find(x=>x.id===id);
    if(s) Object.assign(s, patch);
    saveDB(db);
    return s;
  },
  approveShop(id){ return DB.updateShop(id, {verified:true}); },

  // ---- products ----
  getProducts(filters={}){
    let list = loadDB().products;
    if(filters.shopId) list = list.filter(p=>p.shopId===filters.shopId);
    return list;
  },
  getProductById(id){ return loadDB().products.find(p=>p.id===id); },
  addProduct(product){
    const db = loadDB();
    const id = "p"+(db.nextId++);
    db.products.push({ id, available:true, stock:1, ...product });
    saveDB(db);
    return id;
  },
  toggleProductAvailability(id){
    const db = loadDB();
    const p = db.products.find(x=>x.id===id);
    if(p) p.available = !p.available;
    saveDB(db);
    return p;
  },

  // ---- reservations ----
  getReservations(filters={}){
    let list = loadDB().reservations;
    if(filters.riderId) list = list.filter(r=>r.riderId===filters.riderId);
    if(filters.shopId) list = list.filter(r=>r.shopId===filters.shopId);
    return list.slice().sort((a,b)=>b.createdAt-a.createdAt);
  },
  createReservation(res){
    const db = loadDB();
    const id = "r"+(db.nextId++);
    db.reservations.unshift({ id, status:"pending", createdAt:Date.now(), ...res });
    saveDB(db);
    return id;
  },
  updateReservationStatus(id, status){
    const db = loadDB();
    const r = db.reservations.find(x=>x.id===id);
    if(r) r.status = status;
    saveDB(db);
    return r;
  },

  // ---- contact log ----
  logContact(entry){
    const db = loadDB();
    const id = "c"+(db.nextId++);
    db.contactLog.unshift({ id, when:Date.now(), ...entry });
    saveDB(db);
    return id;
  },
  getContactLog(filters={}){
    let list = loadDB().contactLog;
    if(filters.shopId) list = list.filter(c=>c.shopId===filters.shopId);
    return list;
  },

  // ---- users ----
  getUsers(){ return loadDB().users; },
  getUserById(id){ return loadDB().users.find(u=>u.id===id); },
  toggleFavorite(userId, shopId){
    const db = loadDB();
    const u = db.users.find(x=>x.id===userId);
    if(!u) return;
    u.favorites = u.favorites || [];
    const i = u.favorites.indexOf(shopId);
    if(i>=0) u.favorites.splice(i,1); else u.favorites.push(shopId);
    saveDB(db);
    return u;
  },
  addVehicle(userId, vehicle){
    const db = loadDB();
    const u = db.users.find(x=>x.id===userId);
    if(!u) return;
    u.garage = u.garage || [];
    u.garage.push(vehicle);
    saveDB(db);
  },
  suspendUser(userId){
    const db = loadDB();
    const u = db.users.find(x=>x.id===userId);
    if(u) u.suspended = !u.suspended;
    saveDB(db);
    return u;
  },

  // ---- stats ----
  getStats(){
    const db = loadDB();
    const zones = {};
    db.shops.forEach(s=>{ zones[s.zone] = zones[s.zone] || {vendors:0, reservations:0}; zones[s.zone].vendors++; });
    db.reservations.forEach(r=>{
      const shop = db.shops.find(s=>s.id===r.shopId);
      if(shop) zones[shop.zone].reservations++;
    });
    return {
      vendorCount: db.shops.length,
      partsCount: db.products.length,
      reservationCount: db.reservations.length,
      pendingVerification: db.shops.filter(s=>!s.verified).length,
      riderCount: db.users.filter(u=>u.role==="rider").length,
      zones
    };
  },

  reset: resetDB
};
