drop table checked;
drop table taSection;
drop table TA;
drop table response;
drop table questionTopic;
drop table quizQuestion;
drop table option;
drop table question;
drop table quiz;
drop table teaches;
drop table takes;
drop table section;
drop table topic;
drop table course;
drop table teacher;
drop table student;

create table student(
	ID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(ID)
);


create table teacher(
	ID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(ID)
);

create table course(
	cID varchar(20),
	name varchar(50),
	primary key(cID)
);

create table topic(
	tID varchar(20),
	cID varchar(20),
	name varchar(50),
	foreign key(cID) references course,
	primary key(tID,cID)
);

create table section(
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	foreign key(cID) references course,
	primary key(cID,year,semester),
	check (semester in ('Fall','Spring','Summer','Winter'))
);

create table takes(
	sID varchar(20),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	grade varchar(3),
	foreign key(sID) references student,
	foreign key(cID,year,semester) references section,
	primary key(sID,cID,year,semester)
);

create table teaches(
	tID varchar(20),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	foreign key(tID) references teacher,
	foreign key(cID,year,semester) references section,
	primary key(tID,cID,year,semester)
);

create table quiz(
	qzID  varchar(20),
	name varchar(20),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	start timestamp,
	duration interval,
	foreign key(cID,year,semester) references section,
	primary key(qzID,cID,year,semester)
);

create table question(
	qID serial,
	tID varchar(20),
	problem varchar(1000),
	foreign key(tID) references teacher,
	primary key(qID)
);

create table option(
	qID integer,
	isCorrect bool,
	optNum integer,
	opt varchar(1000),
	foreign key(qID) references question,
	primary key(qID,optNum)
);

create table quizQuestion(
	qID integer,
	qzID varchar(20),
	maxMarks float(2),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	foreign key(qID) references question,
	foreign key(qzID,cID,year,semester) references quiz,
	primary key(qzID,cID,year,semester,qID)
);

create table questionTopic(
	qID integer,
	tID varchar(20),
	cID varchar(20),
	foreign key (qID) references question,
	foreign key (tID, cID) references topic,
	primary key(qID, tID, cID)
);

create table response(
	sID varchar(20),
	qID integer,
	qzID varchar(20),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	answer varchar(2000),
	timeTaken interval,
	isAttempted bool,
	marksObtained float(2),
	foreign key(sID) references student,
	foreign key(qzID,cID,year,semester, qID) references quizQuestion,
	primary key(sID, qzID, qID)
);

create table TA(
	ID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(ID)
);

create table taSection(
	taID varchar(20),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	foreign key(cID, year, semester) references section,
	foreign key(taID) references ta,
	primary key(taID, cID, year, semester)
);

create table checked(
	taID varchar(20),
	cID varchar(20),
	year numeric(4,0),
	semester varchar(10),
	qID integer,
	qzID varchar(20),
	isChecked bool,
	foreign key(taID, cID, year, semester) references taSection,
	foreign key(qzID,cID,year,semester,qID) references quizQuestion,
	primary key(taID,cID,year,semester,qID,qzID)
);

