const Logout = () => {
    localStorage.clear("token");
    window.location.href = "/";
}
export default Logout;