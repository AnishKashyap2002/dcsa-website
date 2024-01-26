export type Subject = {
    name: string;
    code: string;
    image: string;
    semester: string;
    info: string;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    hashedPassword: string;
    subjects: Subject[] | [];
    rollno: number;
    bio: string | null;
    image: string | null;
    type: string | null;
};

export type Annoucement = {
    _id: string;
    user: User;
    title: string;
    link: string;
    image: string;
    data: string;
    createdAt: Date;
    document: string;
};
