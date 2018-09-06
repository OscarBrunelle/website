ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 50, 50);


ctx.beginPath();
ctx.arc(75, 75, 50, 0, Math.PI * 2, true);  // Cercle extérieur
ctx.moveTo(110,75);
ctx.arc(75, 75, 35, 0, Math.PI, false);  // Bouche (sens horaire)
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Oeil gauche
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Oeil droite
ctx.stroke();
