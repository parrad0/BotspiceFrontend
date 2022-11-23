import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
	font-family: 'Avenir';
	src: url('/fonts/AvenirNextLTPro-Bold.otf');
	font-weight: 800;
	font-style: normal;
   }
   @font-face {
	font-family: 'Avenir';
	src: url('/fonts/AvenirNextLTPro-Regular.otf');
	font-weight: normal;
	font-style: normal;
   }
   @font-face {
	font-family: 'Avenir';
	src: url('/fonts/AvenirNextLTPro-It.otf');
	font-weight: normal;
	font-style: italic;
   }

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: message-box;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a, a:hover, a:focus, a:active {
	text-decoration: none;
	color: inherit;
}

@-webkit-keyframes robot_bounce{

	0%{
	transform:translateY(80px)}

	100%{
	transform:translateY(30px)}}

	@keyframes robot_bounce{

	0%{
	transform:translateY(80px)}

	100%{
	transform:translateY(30px)}}

	@-webkit-keyframes shadow{

	0%{ 
	transform:scale(1.5,1.2); 
}

	100%{
	transform:scale(1,1); 
}}

	@keyframes shadow{

	0%{
	transform:scale(1.5,1.2); 
	opacity:0.4}

	100%{
	transform:scale(1,1); 
	opacity:0.2}}

	@-webkit-keyframes arms_bounce_left{

	0%{
	transform:rotate(0deg)}

	100%{
	transform:rotate(-15deg)}}

	@keyframes arms_bounce_left{

	0%{
	transform:rotate(0deg)}

	100%{
	transform:rotate(-15deg)}}

	@-webkit-keyframes arms_bounce_right{

	0%{
	transform:rotate(0deg)}

	100%{
	transform:rotate(15deg)}}

	@keyframes arms_bounce_right{

	0%{
	transform:rotate(0deg)}

	100%{
	transform:rotate(15deg)}}

	@-webkit-keyframes eyes_blink{

	0%{
	transform:scale(1,1)}

	90%{ 
	transform:scale(1,1)}

	95%{
	transform:scale(0.8,0)}

	100%{
	transform:scale(1,1)}}

	@keyframes eyes_blink{

	0%{
	transform:scale(1,1)}

	90%{
	transform:scale(1,1)}

	95%{
	transform:scale(0.8,0)}

	100%{
	transform:scale(1,1)}}

	#body{
	animation:robot_bounce 1.1s ease-in-out 0s infinite alternate}

	#head{
	animation:robot_bounce 1.1s ease-in-out 0.05s infinite alternate}

	#arms{
	animation:robot_bounce 1.1s ease-in-out 0.1s infinite alternate}

	#arms #left{
	transform-origin:center right; 
	animation:arms_bounce_left 1.1s ease-in-out 0s infinite alternate}

	#arms #right{
	transform-origin:center left; 
	animation:arms_bounce_right 1.1s ease-in-out 0s infinite alternate}

	#eyes ellipse{
	transform-origin:center center; 
	animation:eyes_blink 2s ease-out 0s infinite alternate}

	#hover ellipse{
	transform-origin:center center; 
	animation:shadow 1.1s ease-in-out 0s infinite alternate}

`;
export default GlobalStyles;
