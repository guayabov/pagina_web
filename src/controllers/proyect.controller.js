// Importa el servicio de proyectos que contiene la lógica de negocio
const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
exports.createProject = async (req, res) => {
    // Extrae el nombre y la descripción del cuerpo de la solicitud
    const { name, description } = req.body;

    try {
        // Llama al servicio para crear el proyecto con los datos proporcionados
        const project = await projectService.createProject(name, description);

        // Responde con un estado 201 (creado) y devuelve el proyecto creado
        res.status(201).json({ message: 'Proyecto creado exitosamente', project });
    } catch (err) {
        // En caso de error, responde con un estado 400 y el mensaje de error
        res.status(400).json({ message: err.message });
    }
};

// Controlador para obtener la lista de proyectos
exports.getProjects = async (req, res) => {
    try {
        // Llama al servicio para obtener todos los proyectos almacenados
        const projects = await projectService.getAllProjects();

        // Responde con un estado 200 (éxito) y devuelve la lista de proyectos
        res.status(200).json({ projects });
    } catch (err) {
        // En caso de error, responde con un estado 400 y el mensaje de error
        res.status(400).json({ message: err.message });
    }
};

