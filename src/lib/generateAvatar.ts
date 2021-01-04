const colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6",
                "#34495e", "#16a085", "#27ae60", "#2980b9",
                "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22",
                "#e74c3c", "#95a5a6", "#f39c12", "#d35400",
                "#c0392b", "#bdc3c7", "#7f8c8d"];

const generateAvatarColor = (firstname:string, lastname:string) => {
    if(firstname && lastname) {
        const initials = firstname[0].toUpperCase() + lastname[0].toUpperCase()
        const charIndex = initials.charCodeAt(0) - 65;
        const colorIndex = charIndex % 19;
        return colors[colorIndex]
    }
}

export default generateAvatarColor