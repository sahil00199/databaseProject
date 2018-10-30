

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class AutoCompleteQuestion
 */
@WebServlet("/AutoCompleteQuestion")
public class AutoCompleteQuestion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AutoCompleteQuestion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session.getAttribute("id") == null){
			response.sendRedirect("LoginServlet");
			return;
		}
		if (!session.getAttribute("role").equals("instructor")){
			response.sendRedirect("illegalAccess.html");
			return;
		}
		String partial = (String) request.getParameter("partial");
		String topicid = (String) request.getParameter("topic");
		String objective = (String) request.getParameter("objective");
		String subjective = (String) request.getParameter("subjective");
		System.out.println(topicid);
		System.out.println(objective);
		System.out.println(subjective);
		System.out.println(partial);
		int isObj = Integer.parseInt(objective);
		int isSubj = Integer.parseInt(subjective);
		partial = partial + "%";
		String query = "";
		if (isObj == 1 && isSubj == 0)
		{
			query = "select problem as label, problem as value from (question "
					+ "natural inner join topic) where topicid = ? "
					+ "and problem like ? and isObjective=true;";
		}
		else if (isObj == 0 && isSubj == 1)
		{
			query = "select problem as label, problem as value from (question "
					+ "natural inner join topic) where topicid = ? "
					+ "and problem like ? and isObjective=false;";
		}
		else if (isObj == 1 && isSubj == 1)
		{
			query = "select problem as label, problem as value from (question "
					+ "natural inner join topic) where topicid = ? "
					+ "and problem like ?";
		}
		else
		{
			response.getWriter().print("\"data\":[],\"status\":true");
			return;
		}
		String res = DbHelper.executeQueryJson(query, 
				new DbHelper.ParamType[] {DbHelper.ParamType.INT,
						DbHelper.ParamType.STRING}, 
				new String[] {topicid, partial});
		PrintWriter out = response.getWriter();
		out.print(res);
			
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
