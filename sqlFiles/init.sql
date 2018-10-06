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
	sID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(sID)
);
	

create table instructor(
	iID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(iID)
);

create table course(
	courseID serial,
	name varchar(50),
	primary key(courseID)
);

create table topic(
	topicID serial,
	courseID integer,
	name varchar(50),
	foreign key(courseID) references course
		on delete cascade,
	primary key(topicID)
);

create table section(
	secID serial,
	courseID integer,
	year numeric(4,0),
	semester varchar(10),
	foreign key(courseID) references course
		on delete cascade,
	primary key(secID),
	check (semester in ('Fall','Spring','Summer','Winter'))
);

create table takes(
	sID varchar(20),
	secID integer,
	grade varchar(3),
	foreign key(sID) references student
		on delete cascade,
	foreign key(secID) references section
		on delete cascade,
	primary key(sID,secID)
);

create table teaches(
	iID varchar(20),
	secID integer,
	foreign key(iID) references instructor
		on delete cascade,
	foreign key(secID) references section
		on delete cascade,
	primary key(iID,secID)
);

create table quiz(
	qzID serial,
	name varchar(20),
	secID integer,
	start timestamp,
	duration interval,
	foreign key(secID) references section
		on delete cascade,
	primary key(qzID,secID)
);

create table question(
	qID serial,
	iID varchar(20),
	problem varchar(1000),
	isObjective bool,
	foreign key(iID) references instructor
		on delete cascade,
	primary key(qID)
);

create table option(
	qID integer,
	isCorrect bool,
	optNum integer,
	opt varchar(1000),
	foreign key(qID) references question
		on delete cascade,
	primary key(qID,optNum)
);

create table quizQuestion(
	qID integer,
	secID integer,
	qzID integer,
	maxMarks float(2),
	foreign key(qID) references question
		on delete cascade,
	foreign key(qzID, secID) references quiz
		on delete set null,
	primary key(qzID, secID, qID)
);

create table questionTopic(
	qID integer,
	topicID integer,
	foreign key (qID) references question
		on delete set null,
	foreign key (topicID) references topic
		on delete set null,
	primary key(qID, topicID)
);

create table response(
	sID varchar(20),
	qID integer,
	qzID integer,
	secID integer,
	answer varchar(2000),
	timeTaken interval,
	isAttempted bool,
	marksObtained float(2),
	foreign key(sID) references student
		on delete cascade,
	foreign key(qzID,secID, qID) references quizQuestion
		on delete set null,
	primary key(sID, qzID, qID)
);

create table TA(
	taID varchar(20),
	name varchar(20),
	email varchar(20),
	password varchar(20),
	primary key(taID)
);

create table taSection(
	taID varchar(20),
	secID integer,
	foreign key(secID) references section
		on delete cascade,
	foreign key(taID) references ta
		on delete cascade,
	primary key(taID, secID)
);

create table checked(
	taID varchar(20),
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

