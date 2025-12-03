namespace SmartSchool_Backend.Models
{
    public class AlunoDisciplina
    {
        public AlunoDisciplina() { }

         public AlunoDisciplina(int AlunoId, int DisciplinaId)
        {
            this.AlunoId = AlunoId;
            this.DisciplinaId = DisciplinaId;
        }
        public Aluno Aluno { get; set; }
        public Disciplina Disciplina { get; set; }

        public int AlunoId { get; set; }
        public int DisciplinaId { get; set; }

    }
}