import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Rightdiv from "./Rightdiv"
const CreateProject = () => {
    const [projectName, setProjectName] = useState('')
    const [MaxMember, setMaxMember] = useState('')
    const [type, setType] = useState('')
    const [isPending, setIsPending] = useState(false)
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const project = { projectName, MaxMember, type }
        setIsPending(true)
        fetch('http://localhost:8000/projectList', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
        }).then(() => {
            setIsPending(false)
            history('/Projects')
        })
    }

    return (
        <div className="create-project">
            <div className="create-project-left">
                <div className="create">
                    <h1 className="new-project-head">New Project</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="project-heading">Project name</label>
                        <input
                            type="text"
                            required
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <label className="max-mem">Max Members</label>
                        <input
                            type="text"
                            required
                            value={MaxMember}
                            onChange={(e) => setMaxMember(e.target.value)}
                        />
                        <label className="project-heading">Project type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Education">Education</option>
                            <option value="Business">Business</option>
                        </select>
                        {setIsPending && <button>Create</button>}
                        {!setIsPending && <button disabled>Adding Project...</button>}
                    </form>
                </div>
            </div>

            <div className="create-project-right">
                <Rightdiv />
            </div>
        </div>
    )
}

export default CreateProject