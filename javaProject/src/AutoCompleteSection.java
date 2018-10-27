

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.io.PrintWriter;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class AutoCompleteSection
 */
@WebServlet("/AutoCompleteSection")
public class AutoCompleteSection extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AutoCompleteSection() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session.getAttribute("id") == null)
		{
			response.sendRedirect("LoginServlet");
		}
		if (!session.getAttribute("role").equals("instructor"))
		{
			response.sendRedirect("illegalAccess.html");
		}
		else
		{
			String partial = (String) request.getParameter("partial");
			String location = (String) request.getParameter("location");
			//String uid = (String) request.getSession().getAttribute("id");
			partial = partial + "%";
			String query = "";
			// System.out.println(location + " " + partial + " " +	 uid);
			if (location.equals("bottom"))
			{
				query = "select courseID as label, courseID as value from course where coursename like ? or courseID like ?";
			}
			else if (location.equals("top"))
			{
				query = "select courseID as label, courseID as value from course where coursename like ? or courseID like ?";
			}
			String res = DbHelper.executeQueryJson(query, 
					new DbHelper.ParamType[] {DbHelper.ParamType.STRING,
							DbHelper.ParamType.STRING}, 
					new String[] {partial, partial});
			PrintWriter out = response.getWriter();
			out.print(res);
			}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}