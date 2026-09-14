/* =========================================================
  Motify - auth.js
   Mock authentication. No real passwords are checked; this
   is a prototype, so login simply sets the current session.
   ========================================================= */

const SESSION_KEY = "kmp_session_v1";

const Auth = {
  currentUser(){
    try{
      const raw = localStorage.getItem(SESSION_KEY);
      if(!raw) return null;
      const { userId } = JSON.parse(raw);
      return DB.getUserById(userId) || null;
    }catch(e){ return null; }
  },

  // Demo login: matches by role, ignores password (prototype only)
  loginAs(userId){
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
  },

  // Register creates a new mock user and logs them in
  register({name, phone, role}){
    const db = DB.all();
    const id = role+"_"+Date.now();
    const user = { id, name, phone, role };
    if(role==="rider"){ user.garage = []; user.favorites = []; }
    if(role==="vendor"){ user.shopId = null; } // vendor completes shop profile after
    db.users.push(user);
    localStorage.setItem("kmp_db_v1", JSON.stringify(db));
    Auth.loginAs(id);
    return user;
  },

  logout(){
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "login.html";
  },

  // Call at top of a protected page. Redirects to login if not
  // signed in, or to home if signed in with the wrong role.
  requireRole(allowedRoles){
    const user = Auth.currentUser();
    if(!user){ window.location.href = "login.html"; return null; }
    if(allowedRoles && !allowedRoles.includes(user.role)){
      window.location.href = "index.html";
      return null;
    }
    return user;
  }
};
