import React, { useEffect, useState } from 'react'
import CustomDropdown from "../../components/CustomDropDown";
import { getMentorAndStudent } from "../../api/mentor-assign"


function MentorAssign() {
    const [assignMentor, setAssignMentor] = useState({
        mentorName: "",
        students: [],
    });
    const [mentors, setMentors] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await getMentorAndStudent();

                if (res?.instructors || res?.students) {
                    const mentorOptions = (res.instructors || []).map(m => ({
                        value: m.id,
                        label: m.name,
                    }));

                    const studentOptions = (res.students || []).map(s => ({
                        value: s.id,
                        label: s.name,
                    }));

                    setMentors(mentorOptions);
                    setStudents(studentOptions);
                } else {
                    setError(res?.message || "No data found");
                }
            } catch (err) {
                console.error("Error fetching mentors/students:", err);
                setError("Failed to fetch mentors/students");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (field, value) => {
        setAssignMentor((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="p-4 sm:p-6 lg:p-4 xl:p-8 gap-4 flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {/* Header */}
                <div className="border-gray-200 flex justify-between items-center p-5">
                    <h1 className="text-[30px] font-bold font-outfit text-headcolor">
                        Mentor Assignment
                    </h1>

                </div>
            </div>
            <div className=" bg-activecolor rounded-2xl shadow-sm border border-gray-100 flex flex-row w-full gap-4 p-5">
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 w-1/2 flex flex-col p-5'>
                    <h1 className='font-poppins text-primary text-xl w-full text-center mb-5'>ASSIGN STUDENTS</h1>
                    <div className='w-full  flex flex-col gap-2'>
                        <CustomDropdown
                            label="Select Mentor"
                            options={mentors}
                            value={assignMentor.mentorName}
                            onChange={(val) => handleChange("mentorName", val)}
                            width="w-full"
                            placeholder="Select Mentor"
                        />
                        <CustomDropdown
                            label="Select Students"
                            options={students}
                            value={assignMentor.students}
                            onChange={(val) => handleChange("students", val)}
                            width="w-full"
                            placeholder="Select students"
                            selectMultipleOption={true}
                        />
                        <button className='px-2 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors font-poppins font-bold'>Assign</button>
                    </div>

                </div>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 flex-1'>
                    <h1 className='font-poppins text-primary text-2xl text-center'>List of Mentors</h1>
                    <table className=' w-full border rounded-xl'>
                        <thead className=''>
                            <tr className=''>
                                <td className='border-r'>S.no</td>
                                <td className='border-r'>Mentor Name</td>
                                <td className='border-r'>Designation</td>
                                <td>Edit/Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=''>
                                <td className='border-r'>1</td>
                                <td className='border-r'>Davidson</td>
                                <td className='border-r'>FootBall</td>
                                <td><button className='px-2 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors'>Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MentorAssign;