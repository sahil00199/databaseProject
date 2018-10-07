insert into student values('s1', 's1', 's1@email.com', 's1');
insert into student values('s2', 's2', 's2@email.com', 's2');
insert into student values('s3', 's3', 's3@email.com', 's3');
insert into student values('s4', 's4', 's4@email.com', 's4');
insert into student values('s5', 's5', 's5@email.com', 's5');
insert into student values('s6', 's6', 's6@email.com', 's6');
insert into student values('s7', 's7', 's7@email.com', 's7');

insert into instructor values('i1', 'i1', 'i1@email.com', 'i1');
insert into instructor values('i2', 'i2', 'i2@email.com', 'i2');
insert into instructor values('i3', 'i3', 'i3@email.com', 'i3');
insert into instructor values('i4', 'i4', 'i4@email.com', 'i4');
insert into instructor values('i5', 'i5', 'i5@email.com', 'i5');
insert into instructor values('i6', 'i6', 'i6@email.com', 'i6');
insert into instructor values('i7', 'i7', 'i7@email.com', 'i7');

insert into course values('CS101', 'Intro to Programming');
insert into course values('CS201', 'Mid level Programming');
insert into course values('CS301', 'Adv level Programming');

insert into section(courseid, year, semester) values('CS101', 2018, 'Fall');
insert into section(courseid, year, semester) values('CS101', 2018, 'Spring');
insert into section(courseid, year, semester) values('CS201', 2018, 'Fall');
insert into section(courseid, year, semester) values('CS301', 2018, 'Spring');

insert into teaches values('i1', 1);
insert into teaches values('i1', 4);
insert into teaches values('i2', 2);
insert into teaches values('i2', 3);
