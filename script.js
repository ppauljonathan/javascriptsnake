var seg=document.getElementsByClassName("segment"),start=0,score=0;
var f=document.getElementById("food");
seg[0].style.backgroundColor="#0f0";
seg[0].style.zIndex=10;
var v_x=0,v_y=0,x=100,y=100,spx=[],spy=[],spxp=[],spyp=[],x_1=200,y_1=y;
spx[0]=x;spy[0]=y;
f.style.left=`${x_1}px`;
f.style.top=`${y_1}px`;
var wall=0;
function switcheroo()
{
    if(wall==0){wall=1;document.title="SNAKE (WALLS)";}
    else{wall=0;document.title="SNAKE (NO WALLS)";}
}
function init()
{
    for(i=1;i<seg.length;i++)
            {
                spx[i]=x;
                spy[i]=y;
            }
    for(i=0 ;i<seg.length-1;i++)
            {
                spxp[i]=spx[i];
                spyp[i]=spy[i];
            }
    }    
function update()
{
    for(i=0;i<seg.length-1;i++)
        {
            spxp[i]=spx[i];
            spyp[i]=spy[i];
        }
    for(i=1;i<seg.length;i++)
        {
            spx[i]=spxp[i-1];
            spy[i]=spyp[i-1];
        }
    x+=v_x;y+=v_y;
    if(wall==0)
    {flatTorus();}
    else
    {walls();}
    spx[0]=x;spy[0]=y;
    place();
}
function walls()
{if(x<0||x>window.innerWidth-20||y<0||y>window.innerHeight-20){gameOver();}}
function flatTorus()
{if(x<0){x=window.innerWidth-10;}
else if(x>window.innerWidth-10){x=0;}
else if(y<0){y=window.innerHeight-10;}
else if(y>window.innerHeight-10){y=0;}
}
function move(k)
    {
         if(k=="ArrowUp")
         {if(v_y==0){v_y=-10;v_x=0;}start=1;}
         else if(k=="ArrowDown")
         {if(v_y==0){v_y=10;v_x=0;}start=1;}
         else if(k=="ArrowLeft")
         {if(v_x==0){v_x=-10;v_y=0;}start=1;}
         else if(k=="ArrowRight")
         {if(v_x==0){v_x=10;v_y=0;}start=1;}
         else if(k=="w"||k=="W"){switcheroo();}
    }
function place()
{
    for(i=0;i<seg.length;i++)
    {seg[i].style.left=`${spx[i]}px`;
            seg[i].style.top=`${spy[i]}px`;}
    
    if((spx[0]<x_1+10&&spx[0]>x_1-10)&&(spy[0]<y_1+10&&spy[0]>y_1-10))
    {
        x_1=randomer(0,window.innerWidth-10);
        y_1=randomer(0,window.innerHeight-10);  
        var sgt=document.createElement("div");
        sgt.classList.add("segment");
        document.body.firstElementChild.firstElementChild.appendChild(sgt)
        score++;
        f.style.left=`${x_1}px`;    
        f.style.top=`${y_1}px`;
    }
    
    for(i=1;i<seg.length;i++)
    {
        if(start==1&&spx[i]==spx[0]&&spy[i]==spy[0])
        {gameOver();}
    }
}
function gameOver()
{
    v_x=0;v_y=0;
    for(var i=0;i<seg.length;i++)
    {seg[i].style.backgroundColor="#000";}
    f.style.backgroundColor="#000";
    document.getElementById("alert").style.border="2px solid white"
    document.getElementById("alert").innerHTML="<pre>GAME OVER\nSCORE="+score+"\nCLICK THIS BOX TO\nPLAY AGAIN</pre>";

}
function randomer(a,b)
{
    return (a+Math.floor((b-a+1)*Math.random()));
}
setInterval(()=>{update();},50);