https://sample-blog-100.netlify.app/start
---------------------------------------------------------------
Week 5: VPC Creation and EC2 Instance Connection — Complete Step-by-Step Guide
This setup creates:


1 Custom VPC


1 Public Subnet


1 Private Subnet


Internet Gateway


NAT Gateway


Route Tables


2 EC2 Instances


Public EC2


Private EC2




Architecture:
Internet   |Internet Gateway   |Public Subnet (10.0.1.0/24)   |Public EC2 + NAT Gateway   |Private Subnet (10.0.2.0/24)   |Private EC2

STEP 1 — Create the VPC
Go to:
AWS Console → VPC
Create VPC


Click Create VPC


Select:


VPC only


Enter:


FieldValueName tagCustom-VPCIPv4 CIDR10.0.0.0/16IPv6 CIDRNo IPv6 CIDRTenancyDefault


Click:


Create VPC
VPC created successfully.

STEP 2 — Create Public Subnet
Go to:
VPC → Subnets
Click:
Create subnet
Enter Details
FieldValueVPC IDCustom-VPCSubnet namePublic-SubnetAvailability Zoneap-south-1aIPv4 CIDR10.0.1.0/24
Click:
Create subnet

STEP 3 — Create Private Subnet
Again click:
Create subnet
Enter Details
FieldValueVPC IDCustom-VPCSubnet namePrivate-SubnetAvailability Zoneap-south-1aIPv4 CIDR10.0.2.0/24
Click:
Create subnet

STEP 4 — Enable Auto Assign Public IP
This is VERY important for public EC2.
For Public Subnet


Select:


Public-Subnet


Click:


Actions → Edit subnet settings


Enable:


Auto-assign public IPv4 address


Save


Do NOT enable this for private subnet.

STEP 5 — Create Internet Gateway (IGW)
Go to:
VPC → Internet Gateways
Click:
Create internet gateway
Enter
FieldValueNameCustom-IGW
Click:
Create internet gateway

STEP 6 — Attach IGW to VPC


Select:


Custom-IGW


Click:


Actions → Attach to VPC


Select:


Custom-VPC


Click:


Attach internet gateway

STEP 7 — Create Public Route Table
Go to:
VPC → Route Tables
Click:
Create route table
Enter
FieldValueNamePublic-RTVPCCustom-VPC
Click:
Create route table

STEP 8 — Add Internet Route
Open:
Public-RT
Go to:
Routes tab → Edit routes
Click:
Add route
Enter
DestinationTarget0.0.0.0/0Internet Gateway
Select:
Custom-IGW
Save changes.

STEP 9 — Associate Public Subnet
Inside Public-RT:
Go to:
Subnet Associations → Edit subnet associations
Select:
Public-Subnet
Save.

STEP 10 — Create Private Route Table
Again click:
Create route table
Enter
FieldValueNamePrivate-RTVPCCustom-VPC
Click:
Create route table

STEP 11 — Associate Private Subnet
Open:
Private-RT
Go to:
Subnet Associations
Click:
Edit subnet associations
Select:
Private-Subnet
Save.
Currently private subnet has NO internet.

STEP 12 — Create Elastic IP for NAT Gateway
Go to:
VPC → Elastic IPs
Click:
Allocate Elastic IP address
Click:
Allocate

STEP 13 — Create NAT Gateway
Go to:
VPC → NAT Gateways
Click:
Create NAT Gateway
Enter
FieldValueNameCustom-NATSubnetPublic-SubnetElastic IPSelect allocated IP
Click:
Create NAT Gateway
Wait until status becomes:
Available
This may take 2–5 minutes.

STEP 14 — Add NAT Route to Private Route Table
Open:
Private-RT
Go to:
Routes → Edit routes
Click:
Add route
Enter
DestinationTarget0.0.0.0/0NAT Gateway
Select:
Custom-NAT
Save changes.
Now private subnet gets outbound internet via NAT.

STEP 15 — Create Security Group for Public EC2
Go to:
EC2 → Security Groups
Click:
Create security group
Enter
FieldValueNamePublic-SGDescriptionPublic EC2 SGVPCCustom-VPC

Add Inbound Rules
TypePortSourceSSH22My IPHTTP80AnywhereHTTPS443Anywhere
Click:
Create security group

STEP 16 — Create Security Group for Private EC2
Again create security group.
FieldValueNamePrivate-SGDescriptionPrivate EC2 SGVPCCustom-VPC

Add Inbound Rule
TypePortSourceSSH22Public-SG
This means ONLY public EC2 can SSH into private EC2.
Create security group.

STEP 17 — Launch Public EC2 Instance
Go to:
EC2 → Instances → Launch instances
Configure
FieldValueNamePublic-EC2AMIAmazon Linux 2023Instance Typet2.microKey PairCreate/select keyNetworkCustom-VPCSubnetPublic-SubnetAuto-assign Public IPEnableSecurity GroupPublic-SG
Launch instance.

STEP 18 — Launch Private EC2 Instance
Again click:
Launch instance
Configure
FieldValueNamePrivate-EC2AMIAmazon Linux 2023Instance Typet2.microKey PairSame keyNetworkCustom-VPCSubnetPrivate-SubnetAuto-assign Public IPDisableSecurity GroupPrivate-SG
Launch instance.

STEP 19 — Connect to Public EC2
After instance runs:


Select Public-EC2


Copy Public IPv4 DNS


SSH command:
ssh -i mykey.pem ec2-user@PUBLIC-IP
Example:
ssh -i mykey.pem ec2-user@54.xx.xx.xx

STEP 20 — Test Internet in Public EC2
Run:
ping google.com
OR
sudo yum update -y
Internet should work.

STEP 21 — Connect Public EC2 to Private EC2
Inside Public EC2:
Create key permission:
chmod 400 mykey.pem
SSH into private instance:
ssh -i mykey.pem ec2-user@PRIVATE-IP
Use the PRIVATE IP of private EC2.
Example:
ssh -i mykey.pem ec2-user@10.0.2.45

STEP 22 — Test Internet in Private EC2
Inside Private EC2 run:
ping google.com
OR
sudo yum update -y
It should work through NAT Gateway.
-----------------------------------------------------------------
In Stored XSS Message box: 
<script>alert(document.cookie)</script> 
This shows session cookies (demo of session theft). 
Step 7: Change Security Level 
Go to DVWA Security → set: 
 Medium 
 High 
Repeat the same payloads → see how filtering blocks them. 
Result 
XSS vulnerabilities were successfully identified and exploited in DVWA. 

🚀 AI-Powered Adaptive Quiz System

An intelligent full-stack web application that generates personalized quizzes and provides AI-driven performance analysis using LLMs (Gemini API).

📌 Overview

This project implements an Adaptive Learning System (ALS) that dynamically adjusts to a student’s performance.

Unlike traditional quiz apps, this system:

Identifies weak areas

Generates targeted questions

Analyzes mistakes deeply

Provides actionable learning suggestions

🧠 Key Features
✅ 1. AI-Based Quiz Generation

Generates MCQs using Gemini API

Customizes questions based on:

Topic

Weak areas

Difficulty level

Focuses on conceptual and edge-case questions

✅ 2. Smart Performance Analysis

Evaluates user responses

Identifies:

Weak concepts

Mistake patterns

Learning gaps

Produces structured AI feedback

✅ 3. Personalized Learning Suggestions

Recommends:

What to study next

How to improve

Targeted revision areas

✅ 4. Robust LLM Integration

Structured prompt engineering

Enforced JSON output format

Regex-based response parsing

Fallback handling for API failures

✅ 5. Full-Stack Implementation

Frontend: React.js

Backend: Flask (Python)

AI Integration: Gemini API

🏗️ System Architecture
Frontend (React)
        ↓
Backend API (Flask)
        ↓
----------------------------------
|  Quiz Generator (LLM)          |
|  Performance Analyzer (LLM)    |
|  Weakness Detection Engine     |
----------------------------------
        ↓
User Data (In-Memory / DB)
⚙️ Tech Stack
Layer	Technology
Frontend	React.js
Backend	Flask (Python)
AI/ML	Gemini API
Parsing	Regex + JSON
Deployment	Render + Vercel
🔌 API Endpoints
📥 Generate Quiz

POST /generate-quiz

Request
{
  "topic": "Python OOP",
  "weakAreas": "inheritance, MRO",
  "difficulty": "medium"
}
Response
{
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "...",
      "explanation": "..."
    }
  ]
}
📤 Submit Quiz

POST /submit-quiz

Request
{
  "questions": [...],
  "answers": [...]
}
Response
{
  "score": "3/5",
  "mistakes": [...],
  "analysis": {
    "weakAreas": [...],
    "patterns": [...],
    "nextTopics": [...],
    "suggestions": [...]
  }
}
🧠 Core Logic
🔹 Adaptive Learning Strategy

Prioritizes weak topics

Reduces repetition of strong areas

Maintains balanced difficulty progression

🔹 Prompt Engineering

Designed structured prompts to:

Enforce JSON output

Reduce hallucinations

Improve consistency

🔹 JSON Parsing Strategy

Handles unreliable LLM outputs using:

Regex-based extraction

Format validation

Error handling with retries

🔹 Fallback Mechanism

If Gemini API fails:

Generates fallback questions

Provides basic feedback

👉 Ensures system reliability and uptime

⚠️ Challenges & Solutions
❗ LLM Output Inconsistency

Problem: Invalid or malformed JSON
Solution: Regex extraction + validation + retry logic

❗ API Failures

Problem: API downtime / key issues
Solution: Fallback quiz generator

❗ Prompt Design

Problem: Generic or low-quality outputs
Solution: Iterative prompt engineering with constraints

🚀 Future Improvements

🔐 User authentication (JWT)

🗄️ Persistent database for user progress

📊 Advanced adaptive scoring models

🧠 NLP models (e.g., BERT) for deeper analysis

🏆 Leaderboard & gamification

🔁 Spaced repetition learning

🧪 How to Run Locally
🔹 Backend
pip install -r requirements.txt
python app.py

Create .env file:

GEMINI_API_KEY=your_api_key_here
🔹 Frontend
npm install
npm start
🌐 Deployment

Backend: Render

Frontend: Vercel

💡 What Makes This Project Unique?

✔ Combines AI + Backend + Product Thinking
✔ Implements real adaptive learning logic
✔ Handles real-world LLM limitations
✔ Focuses on learning improvement, not just scoring

🧑‍💻 Author

Shashank Soma

⭐ Final Note

This project demonstrates how Large Language Models can be integrated into real-world systems to build intelligent, adaptive, and user-centric learning applications.
