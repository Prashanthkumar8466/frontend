import '../css/Header.css';
export default function Header({isAuthenticated}) {
    function toggleMenu() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");
    }
    function clstoggleMenu() {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.toggle("active");
        } else {
            console.error("Sidebar element not found");
        }
    }
    const menuItems=[
        {label:'Home',path:'/'},
        {label:'Cart',path:'/cart'},
        isAuthenticated ?{label:'wish list',path:'/wishlist'}:null,
        isAuthenticated ?{label:'profile',path:'/profile'}:null,
        isAuthenticated ?{label:'Logout',path:'/logout'}:{label:'Login',path:'/login'},
        !isAuthenticated ?{label:'Register',path:'/register'}:null,
        !isAuthenticated ?{label:'Contact',path:'/Contact'}:null,
    ]
    const filteredMenuItems = menuItems.filter(item => item !== null);
    return (
        <div>
            <header>
                <div className="mobile-view">
                    <button className="menu-toggle" onClick={toggleMenu}>&#9776;</button>
                    <a href="/" className="logo">Logo or Title</a>
                </div>
                <ul className='Menu-bar'>
                    {filteredMenuItems.map((item,index)=>(
                        <li key={index}><a href={item.path} >{item.label}</a></li>
                    ))}
                </ul>
            </header>
            <div id="sidebar" className="sidebar">
                <div className='side-menu'>
                    <span className="close-btn" onClick={clstoggleMenu}>&times;</span>
                    <ul>
                        {filteredMenuItems.map((item,index)=>(
                            <li key={index}><a href={item.path} >{item.label}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
