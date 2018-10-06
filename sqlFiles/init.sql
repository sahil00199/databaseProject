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
drop table instructor;
drop table student;

create table student(
	ID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(ID)
);
	

create table instructor(
	ID serial,
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(ID)
);

create table course(
	ID serial,
	name varchar(50),
	primary key(ID)
);

create table topic(
	ID serial,
	courseID integer,
	name varchar(50),
	foreign key(courseID) references course(ID)
		on delete cascade,
	primary key(ID)
);

create table section(
	ID serial,
	courseID integer,
	year numeric(4,0),
	semester varchar(10),
	foreign key(courseID) references course(ID)
		on delete cascade,
	primary key(ID),
	check (semester in ('Fall','Spring','Summer','Winter'))
);

create table takes(
	sID integer,
	secID integer,
	courseID integer,
	year numeric(4,0),
	semester varchar(10),
	grade varchar(3),
	foreign key(sID) references student(ID)
		on delete cascade,
	foreign key(secID, courseID, year, semester) references section(ID, courseID, year, semester)
		on delete cascade,
	primary key(sID,secID)
);

create table teaches(
	iID integer,
	secID integer,
	courseID integer,
	year numeric(4,0),
	semester varchar(10),
	foreign key(iID) references instructor(ID)
		on delete cascade,
	foreign key(secID, courseID, year, semester) references section(ID, courseID, year, semester)
		on delete cascade,
	primary key(iID,secID)
);

create table quiz(
	ID serial,
	name varchar(20),
	secID integer,
	start timestamp,
	duration interval,
	foreign key(secID) references section(ID)
		on delete cascade,
	primary key(ID,secID)
);

create table question(
	ID serial,
	iID varchar(20),
	problem varchar(1000),
	foreign key(iID) references instructor(ID)
		on delete cascade,
	primary key(ID)
);

create table option(
	qID integer,
	isCorrect bool,
	optNum integer,
	opt varchar(1000),
	foreign key(qID) references question(ID)
		on delete cascade,
	primary key(qID,optNum)
);

create table quizQuestion(
	qID integer,
	secID integer,
	qzID integer,
	maxMarks float(2),
	foreign key(qID) references question(ID)
		on delete cascade,
	foreign key(qzID, secID) references quiz(ID, secID)
		on delete set null,
	primary key(qzID, secID, qID)
);

create table questionTopic(
	qID integer,
	topicID integer,
	courseID integer,
	foreign key (qID) references question(ID)
		on delete set null,
	foreign key (topicID, courseID) references topic(ID, courseID)
		on delete set null,
	primary key(qID, topicID, courseID)
);

create table response(
	sID integer,
	qID integer,
	qzID integer,
	secID integer,
	answer varchar(2000),
	timeTaken interval,
	isAttempted bool,
	marksObtained float(2),
	foreign key(sID) references student(ID)
		on delete cascade,
	foreign key(qzID,secID, qID) references quizQuestion
		on delete set null,
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
	taID integer,
	secID integer,
	foreign key(secID) references section(ID)
		on delete cascade,
	foreign key(taID) references ta(ID)
		on delete cascade,
	primary key(taID, secID)
);

create table checked(
	taID integer,
	secID integer,
	qID integer,
	qzID integer,
	isChecked bool,
	foreign key(taID, secID) references taSection
		on delete set null,
	foreign key(qzID, secID, qID) references quizQuestion
		on delete set null,
	primary key(taID, secID, qID, qzID)
);

