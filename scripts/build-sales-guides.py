"""Build concise, branded sales PDFs. Input copy is shared with the website.

No production access is used. Owner image was extracted from page 7 of the
user-supplied September 2026 owner demonstration PDF. Other images are selected
captures from the marketing site's synthetic replicas.
"""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'scripts/sales-content.json').read_text())
pdfmetrics.registerFont(TTFont('Noto', '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoBold', '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'))
W, H = landscape(A4)
INK, MUTED, GOLD, PAPER, LINE = map(HexColor, ['#27231E','#625D54','#866734','#F7F2E7','#D8CDBA'])
DARK, PALE = HexColor('#201D18'), HexColor('#E3C89B')
M = 44
CW = W-2*M

def text(c, value, x, top, width, size=12, bold=False, color=INK, leading=None):
    style = ParagraphStyle('p',fontName='NotoBold' if bold else 'Noto',
                           fontSize=size,leading=leading or size*1.45,textColor=color)
    p = Paragraph(value, style)
    _, h = p.wrap(width, H)
    if top+h > H-12:
        raise ValueError(f'Text overflows: {value[:60]}')
    p.drawOn(c,x,H-top-h)
    return h

def logo(c, x, top, dark=False):
    c.setStrokeColor(PALE if dark else GOLD)
    c.setLineWidth(1.3)
    y=H-top
    p=c.beginPath();p.moveTo(x,y-9);p.lineTo(x+10,y);p.lineTo(x+20,y-9)
    c.drawPath(p)
    c.rect(x+3,y-20,14,11,fill=0,stroke=1)
    c.circle(x+10,y-15,3,fill=0,stroke=1)
    text(c,'HostPilot Pro',x+30,top-2,210,17,True,PALE if dark else INK)

def base(c, n, name, dark=False):
    c.setFillColor(DARK if dark else PAPER); c.rect(0,0,W,H,fill=1,stroke=0)
    logo(c,M,30,dark)
    text(c,name.upper(),W-315,32,270,9,False,PALE if dark else MUTED)
    c.setStrokeColor(HexColor('#514A3F') if dark else LINE)
    c.line(M,39,W-M,39)
    text(c,'HOSTPILOT PRO  /  SOFTWARE SALES WALKTHROUGH',M,H-31,620,8.5,color=PALE if dark else MUTED)
    text(c,f'{n} / 6',W-M-40,H-31,40,8.5,color=PALE if dark else MUTED)

def label(c,s,top=92,dark=False):
    text(c,s.upper(),M,top,CW,10,True,PALE if dark else GOLD)

def image_fit(c,path,x,top,width,height,crop_top=False):
    image=Image.open(path).convert('RGB')
    if crop_top:
        image=image.crop((0,0,image.width,min(image.height,int(image.width*.53))))
    iw,ih=image.size
    scale=min(width/iw,height/ih)
    from reportlab.lib.utils import ImageReader
    dw,dh=iw*scale,ih*scale
    c.drawImage(ImageReader(image),x+(width-dw)/2,H-top-dh,width=dw,height=dh)

names={'ops':'Operations','owner':'Owner portal','guest':'Guest portal'}
for key,s in DATA.items():
    name=names[key]
    c=canvas.Canvas(str(ROOT/'public'/s['pdf'].lstrip('/')),pagesize=(W,H),pageCompression=1)
    c.setTitle(f'HostPilot Pro | {name} Sales Guide')
    c.setAuthor('Perplexity Computer')
    # Cover: a sales proposition, not a feature inventory.
    base(c,1,name,True);label(c,'For property management companies' if key=='ops' else f'The {name.lower()} experience',96,True)
    h=text(c,s['headline'],M,129,CW-40,34,True,HexColor('#FBF8F1'),42)
    text(c,s['intro'],M,151+h,CW-65,15,color=HexColor('#D4CDBF'),leading=23)
    text(c,'CORE FUNCTIONS  ·  SELECTED SCREENS  ·  CLIENT CONTEXT',M,425,CW,10,True,PALE)
    text(c,'HostPilot Pro is the software. Mr Property Siam is the founding client example.',M,454,CW,12,color=HexColor('#D4CDBF'))
    text(c,'September 2026 · A concise sales introduction, not an internal training manual.',M,496,CW,10,color=HexColor('#B8AE9D'))
    c.showPage()
    # Core functions: no screenshot for every feature.
    base(c,2,name);label(c,'The core functions')
    text(c,'What it does. Why it matters.',M,116,CW,28,True)
    y=174
    row=66 if len(s['functions'])==5 else 79
    for i,(title,body,benefit) in enumerate(s['functions']):
        c.setStrokeColor(LINE);c.line(M,H-y,W-M,H-y)
        text(c,f'0{i+1}',M,y+12,34,11,True,GOLD)
        text(c,title,M+43,y+10,190,13,True)
        text(c,body,M+242,y+10,CW-242,11,False,MUTED,15.5)
        y+=row
    c.showPage()
    # Only one principal product screenshot.
    base(c,3,name);label(c,'Selected product view')
    text(c,{'ops':'Start with the operation.','owner':'Make the financial picture easier to follow.','guest':'A simple place to begin the stay.'}[key],M,117,CW,26,True)
    if key=='guest':
        image_fit(c,ROOT/'public'/s['image'].lstrip('/'),M+470,169,245,343)
        text(c,'The guest does not need to see the internal operation.',M,190,400,24,True)
        text(c,s['promise'],M,277,380,14,color=MUTED,leading=22)
        text(c,s['caption'],M,422,380,10,color=MUTED)
    else:
        image_fit(c,ROOT/'public'/s['image'].lstrip('/'),M,169,CW,338,crop_top=key=='ops')
        text(c,s['caption'],M,516,CW,9,color=MUTED,leading=12)
    c.showPage()
    # Workflow context, not a screenshot catalogue.
    base(c,4,name);label(c,'A practical workflow')
    title={'ops':'From the day’s priorities to completed work.','owner':'Visibility, context and evidence.','guest':'Before arrival. During the stay. When they need more.'}[key]
    text(c,title,M,117,CW,27,True)
    workflow={
      'ops':[('See what needs attention','Start with the day’s arrivals, departures and open jobs.'),('Coordinate responsibility','Use the task board to connect the job, the property and the people doing the work.'),('Keep a record','Make progress and completion visible to the office.')],
      'owner':[('See the position','Bring earnings, upcoming stays and the property’s current picture into view.'),('Understand the detail','Move from a summary to the bookings, costs, payouts or documents behind it.'),('Follow the care','Give maintenance and routine work context through records and evidence.')],
      'guest':[('Prepare the arrival','Present stay details and the arrival information supplied by the team.'),('Find the essentials','Make access details, Wi-Fi and house information easier to find.'),('Request something extra','Show useful services and extras. The office still confirms arrangements.')],
    }[key]
    width=290 if key=='ops' else CW
    y=183
    for i,(t,b) in enumerate(workflow):
        text(c,f'0{i+1}  {t}',M,y,width,15,True,GOLD)
        h=text(c,b,M,y+31,width,12,color=MUTED,leading=18)
        y+=h+65
    if key=='ops':
        image_fit(c,ROOT/'public/img/walkthrough-ops-tasks.jpg',M+315,187,CW-315,294,crop_top=True)
        text(c,'Selected task-board replica. Fictional jobs; no production actions.',M+315,481,CW-315,9,color=MUTED,leading=13)
    c.showPage()
    # Real client, clear brand separation.
    base(c,5,name);label(c,'Founding client showcase')
    text(c,'HostPilot Pro is the software.<br/>Mr Property Siam puts it to work.',M,117,CW,29,True,leading=37)
    text(c,'MPS is the property management company using the platform in its own operation on Koh Samui. It is the founding operator and client example, not an independent customer testimonial.',M,216,CW,14,color=MUTED,leading=21)
    for i,(t,b) in enumerate([
      ('Management company','Coordinate the work and keep operational control.'),
      ('Owner','Understand the property, the money and the work being done.'),
      ('Guest','Find information and discover services for the stay.')]):
        x=M+i*(CW/3)
        c.setStrokeColor(LINE);c.line(x,H-302,x+CW/3-20,H-302)
        text(c,t,x,319,CW/3-22,15,True)
        text(c,b,x,358,CW/3-25,12,color=MUTED)
    text(c,'The owner screen comes from the supplied MPS demonstration guide. Ops and guest screens are marketing replicas using fictional records. No live MPS client data is exposed.',M,464,CW,10,color=MUTED)
    c.showPage()
    # Honest commercial scope and next action.
    base(c,6,name);label(c,'The next conversation')
    text(c,'See the fit before making the move.',M,117,CW,29,True)
    text(c,'Bring your portfolio, current systems and the workflows that matter most. A guided demonstration should establish what is available, what needs configuring and what is not included.',M,174,CW,14,color=MUTED,leading=21)
    y=252
    for limit in s['limits']:
        c.setFillColor(GOLD);c.circle(M+3,H-y-8,2,fill=1,stroke=0)
        h=text(c,limit,M+17,y,CW-17,11,color=MUTED,leading=16)
        y+=h+15
    c.setFillColor(DARK);c.roundRect(M,80,310,45,8,fill=1,stroke=0)
    text(c,'Book a guided demonstration',M+19,H-112,273,12,True,PALE)
    c.linkURL('https://hostpilotpro.com/demo',(M,80,M+310,125),relative=0)
    text(c,'<a href="https://hostpilotpro.com">hostpilotpro.com</a>',M+338,H-110,CW-338,13,True,GOLD)
    c.save()
    print(f'Built {s["pdf"]}')
