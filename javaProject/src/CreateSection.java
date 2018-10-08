

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class CreateSection
 */
@WebServlet("/CreateSection")
public class CreateSection extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateSection() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session.getAttribute("id") == null)//not logged in
		{
			response.sendRedirect("login.html");
			return;
		}
		if (!session.getAttribute("role").equals("instructor"))
		{
			response.sendRedirect("illegalAccess.html");
		}
		String courseID = (String)request.getParameter("courseID");
		String year = (String)request.getParameter("year");
		String semester = (String)request.getParameter("semester");
		String query = "insert into section(courseid, year, semester) values (?, ?, ?)";
		String json = DbHelper.executeUpdateJson(query, 
				new DbHelper.ParamType[] {DbHelper.ParamType.STRING,
						DbHelper.ParamType.INT,
						DbHelper.ParamType.STRING},
				new String[] {courseID, year, semester});
		System.out.println(json);
		response.getWriter().print(json);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
