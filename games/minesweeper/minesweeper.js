var DEFAULT_WIDTH = 20;
var DEFAULT_HEIGHT = 12;
var DEFAULT_MINES = 36;

function start() {
  alert("Wait... The Game is starting!");
  var width = prompt("input the width", "ex: 20");
  var height = prompt("input the height", "ex: 12");
  var mines = prompt("input the mines", "ex: 36");
  while (mines >= width * height) {
    alert("Too many mines, try again");
    mines = prompt("input the mines");
  }
  createField(width, height);
}

function createField(width = 20, height = 12) {
  var column;
  field = document.getElementById("field");
  for (var i = 0; i < height; i++) {
    d = document.createElement("div");
    for (var y = 0; y < width; y++) {
      b = document.createElement("button");
      b.setAttribute("src", "icons/0.png");
      b.setAttribute("width", "16");
      b.setAttribute("height", "32");
      b.setAttribute("alt", "Mine?");
      b.setAttribute("onclick", "buttonClicked()");
      d.appendChild(b);
    }
    field.appendChild(d);
  }
}

function createMines(mines = 36){
  while(mines>0){
    var i = Math.floor(Math.random()*width);
    var j = Math.floor(Math.random()*height);
    if (!model[i][j].isMined()) {
      model[i][j].setMined();
      mines--;
    }
  }
}

function buttonClicked(){
  alert("that's a mine!");
}




























import java.awt.Color;
import java.awt.Dimension;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.BorderFactory;
import javax.swing.border.Border;

/**
 * In the application <b>Minesweeper</b>, a <b>DotButton</b> is a specialized type of
 * <b>JButton</b> that represents a square in the game.
 * It can have a number of possible icons, which are found in the
 * "icons" directory. The icon expresses the state of the dot:
 * covered, number of neighbooring mines, exploded..
 *
 *
 *
 *  The icons have been found on <a href=
 * "https://en.wikipedia.org/wiki/Open_content">wikimedia</a>. The author of these
 * icons seems to be someone called
 * <a href="https://commons.wikimedia.org/wiki/User:Cryosta">Kazukiokumura</a>.
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */

public class DotButton extends JButton {



     /**
     * predefined values to capture icons of a DotInfo
     */

    public static final int NUMBER_OF_ICONS     = 13;
    public static final int ZERO_NEIGHBOURS     = 0;
    public static final int ONE_NEIGHBOURS      = 1;
    public static final int TWO_NEIGHBOURS      = 2;
    public static final int THREE_NEIGHBOURS    = 3;
    public static final int FOUR_NEIGHBOURS     = 4;
    public static final int FIVE_NEIGHBOURS     = 5;
    public static final int SIX_NEIGHBOURS      = 6;
    public static final int SEVEN_NEIGHBOURS    = 7;
    public static final int EIGHT_NEIGHBOURS    = 8;
    public static final int MINED               = 9;
    public static final int CLICKED_MINE        = 10;
    public static final int COVERED             = 11;
    public static final int FLAGGED             = 12;

   /**
     * The cell current icon number.
     */

    private int iconNumber;

    /**
     * The row of the <b>Board</b> on which this cell is.
     */
    private int row;

    /**
     * The column of the <b>Board</b> on which this cell is.
     */
    private int column;


    /**
     * An array is used to cache all the images. Since the images are not
     * modified, all the cells that display the same image reuse the same
     * <b>ImageIcon</b> object. Notice the use of the keyword <b>static</b>.
     */
    private static final ImageIcon[]icons = new ImageIcon[NUMBER_OF_ICONS];




    /**
     * Constructor used for initializing a DotButton at a specific
     * Board location, with a specific icon.
     *
     * @param column
     *            the column of this Cell
     * @param row
     *            the row of this Cell
     * @param iconNumber
     *            specifies which iconNumber to use for this cell
     */

    public DotButton(int column, int row, int iconNumber) {
    	this.row = row;
    	this.column = column;
    	this.iconNumber = iconNumber;
    	setBackground(Color.WHITE);
    	setIcon(getImageIcon());
    	Border emptyBorder = BorderFactory.createEmptyBorder(0, 0, 0, 0);
    	setBorder(emptyBorder);
    	setBorderPainted(false);
    }





    /**
     * Sets the current value of the instance variable iconNumber, and update
     * the iconNumber used by the instance, using the method getImageIcon()
     * to get the new icon.
     * @param iconNumber
     *            the iconNumber to use, based on the predifined constant values
     *  defined in this class
     */

    public void setIconNumber(int iconNumber) {
    	this.iconNumber = iconNumber;
    	setIcon(getImageIcon());
    }

    /**
     * Getter method for the attribute row.
     *
     * @return the value of the attribute row
     */

    public int getRow() {
	   return row;
    }

    /**
     * Getter method for the attribute column.
     *
     * @return the value of the attribute column
     */

    public int getColumn() {
	   return column;
    }

    /**
     * Returns the <b>ImageIcon</b> reference to use based on
     * the current value of the variable iconNumber.
     *
     * @return the image to be displayed by the button
     */

    private ImageIcon getImageIcon() {


        if (icons[iconNumber] == null) {
                icons[iconNumber] = new ImageIcon("icons/" + getIconFileName());
        }
        return icons[iconNumber];
    }
    /**
     * This method returns the name of the file containing the image
     * corresponding to the current value of the variable iconNumber.
     *
     * @return the name of the icon file to be used
     */
    private String getIconFileName(){
        switch(iconNumber) {
            case 0 : return "Minesweeper_0.png";
            case 1 : return "Minesweeper_1.png";
            case 2 : return "Minesweeper_2.png";
            case 3 : return "Minesweeper_3.png";
            case 4 : return "Minesweeper_4.png";
            case 5 : return "Minesweeper_5.png";
            case 6 : return "Minesweeper_6.png";
            case 7 : return "Minesweeper_7.png";
            case 8 : return "Minesweeper_8.png";
            case 9 : return "Minesweeper_mine.png";
            case 10 : return "Minesweeper_mineSelected.png";
            case 11 : return "Minesweeper_unopened_square.png";
            case 12 : return "Minesweeper_flag.png";
            default: System.out.println("Invalid icon number: " + iconNumber);
                     return "";
        }

    }
}




























/**
 * The class <b>DotInfo</b> is a simple helper class to store
 * the state (e.g. clicked, mined, number of neighbooring mines...)
 * at the dot position (x,y)
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */

public class DotInfo {

    /**
     * The x coordinate of this DotInfo.
     */
    private int x;

    /**
     * The x coordinate of this DotInfo.
     */
    private int y;

    /**
     * The number of neighbooring mines
     */
    private int neighbooringMines;

    /**
     * Is that location mined ?
     */
    private boolean mined;

    /**
     * Is that location uncovered ?
     */
    private boolean covered;

    /**
     * As this location been clicked on by the user ?
     */
    private boolean wasClicked;


    /**
     * Constructor, used to initialize the instance variables
     *
     * @param x
     *            the x coordinate
     * @param y
     *            the y coordinate
     */
    public DotInfo(int x, int y){
        this.x = x;
        this.y = y;
        covered = true;
        mined = false;
        wasClicked = false;
        neighbooringMines = 0;
    }

    /**
     * Getter method for the attribute x.
     *
     * @return the value of the attribute x
     */
    public int getX(){
        return x;
    }

    /**
     * Getter method for the attribute y.
     *
     * @return the value of the attribute y
     */
    public int getY(){
        return y;
    }


    /**
     * Setter for mined
     */
    public void setMined() {
        mined = true;
    }

    /**
     * Getter for mined
     *
     * @return mined
     */
    public boolean isMined() {
        return mined;
    }


    /**
     * Setter for covered
     */
    public void uncover() {
        covered = false;
    }

    /**
     * Getter for covered
     *
     * @return covered
     */
    public boolean isCovered(){
        return covered;
    }



    /**
     * Setter for wasClicked
     */
    public void click() {
        wasClicked = true;
    }


    /**
     * Getter for wasClicked
     *
     * @return wasClicked
     */
    public boolean hasBeenClicked() {
        return wasClicked;
    }


    /**
     * Setter for neighbooringMines
     *
     * @param neighbooringMines
     *          number of neighbooring mines
     */
    public void setNeighbooringMines(int neighbooringMines) {
        this.neighbooringMines = neighbooringMines;
    }

    /**
     * Get for neighbooringMines
     *
     * @return neighbooringMines
     */
    public int getNeighbooringMines() {
        return neighbooringMines;
    }

 }











































import java.util.Random;

/**
 * The class <b>GameModel</b> holds the model, the state of the systems.
 * It stores the following information:
 * - the state of all the ``dots'' on the board (mined or not, clicked
 * or not, number of neighbooring mines...)
 * - the size of the board
 * - the number of steps since the last reset
 *
 * The model provides all of this informations to the other classes trough
 *  appropriate Getters.
 * The controller can also update the model through Setters.
 * Finally, the model is also in charge of initializing the game
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */
public class GameModel {






    /**
     * The number of column of the game.
     */
    private  int widthOfGame;

    /**
     * The number of lines of the game.
     */
    private  int heigthOfGame;

    /**
     * A 2 dimentionnal array of widthOfGame*heigthOfGame
     * recording the state of each dot
     */
	private DotInfo[][] model;


   /**
     * The number of steps played since the last reset
     */
	private int numberOfSteps;

   /**
     * The number of uncovered dots
     */
    private int numberUncovered;


   /**
     * The number of mines in the model
     */
    private int numberOfMines;


   /**
     * Random generator
     */
	private Random generator;

    /**
     * Constructor to initialize the model to a given size of board.
     *
     * @param width
     *            the width of the board
     *
     * @param heigth
     *            the heigth of the board
     *
     * @param numberOfMines
     *            the number of mines to hide in the board
     */
    public GameModel(int width, int heigth, int numberOfMines) {
        generator = new Random();
        widthOfGame = width;
        heigthOfGame = heigth;
        this.numberOfMines = numberOfMines;
        reset();
    }



    /**
     * Resets the model to (re)start a game. The previous game (if there is one)
     * is cleared up .
     */
    public void reset(){

    	model = new DotInfo[widthOfGame][heigthOfGame];

    	for(int i = 0; i < widthOfGame; i++){
		   	for(int j = 0; j < heigthOfGame; j++){
    			model[i][j] = new DotInfo(i,j);
    		}
    	}

        // add mines randomly into the board
        int numberToAdd = numberOfMines;
        while(numberToAdd > 0) {
            int i = generator.nextInt(widthOfGame);
            int j = generator.nextInt(heigthOfGame);
            if(!model[i][j].isMined()){
                model[i][j].setMined();
                numberToAdd--;
            }
        }

    	// compute the number of mines around each dots.
        for(int i = 0; i < widthOfGame; i++){
            for(int j = 0; j < heigthOfGame; j++){
                int total = 0;
                for(int k = Math.max(i-1, 0); k <= Math.min(i+1, widthOfGame-1); k++) {
                    for(int l = Math.max(j-1, 0); l <= Math.min(j+1, heigthOfGame-1); l++) {
                        if(model[k][l].isMined()) {
                            total++;
                        }
                    }
                }
                model[i][j].setNeighbooringMines(total);
            }
        }


    	numberOfSteps = 0;
        numberUncovered = 0;

    }


    /**
     * Getter method for the heigth of the game
     *
     * @return the value of the attribute heigthOfGame
     */
    public int getHeigth(){
        return heigthOfGame;
    }

    /**
     * Getter method for the width of the game
     *
     * @return the value of the attribute widthOfGame
     */
    public int getWidth(){
        return widthOfGame;
    }



    /**
     * returns true if the dot at location (i,j) is mined, false otherwise
    *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     * @return the status of the dot at location (i,j)
     */
    public boolean isMined(int i, int j){
        return model[i][j].isMined();
    }

    /**
     * returns true if the dot  at location (i,j) has
     * been clicked, false otherwise
     *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     * @return the status of the dot at location (i,j)
     */
    public boolean hasBeenClicked(int i, int j){
        return model[i][j].hasBeenClicked();
    }

  /**
     * returns true if the dot  at location (i,j) has zero mined
     * neighboor, false otherwise
     *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     * @return the status of the dot at location (i,j)
     */
    public boolean isBlank(int i, int j){
        return model[i][j].getNeighbooringMines() == 0;
    }
    /**
     * returns true if the dot is covered, false otherwise
    *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     * @return the status of the dot at location (i,j)
     */
    public boolean isCovered(int i, int j){
        return model[i][j].isCovered();
    }

    /**
     * returns the number of neighbooring mines os the dot
     * at location (i,j)
     *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     * @return the number of neighbooring mines at location (i,j)
     */
    public int getNeighbooringMines(int i, int j){
        return model[i][j].getNeighbooringMines();
    }


    /**
     * Sets the status of the dot at location (i,j) to uncovered
     *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     */
    public void uncover(int i, int j){
 		model[i][j].uncover();
        numberUncovered++;
    }

    /**
     * Sets the status of the dot at location (i,j) to clicked
     *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     */
    public void click(int i, int j){
        model[i][j].click();
    }
     /**
     * Uncover all remaining covered dot
     */
    public void uncoverAll(){
        for(int i = 0; i < widthOfGame; i++){
            for(int j = 0; j < heigthOfGame; j++){
                if(isCovered(i,j)) {
                    uncover(i,j);
                }
            }
        }
    }



    /**
     * Getter method for the current number of steps
     *
     * @return the current number of steps
     */
    public int getNumberOfSteps(){
    	return numberOfSteps;
    }



    /**
     * Getter method for the model's dotInfo reference
     * at location (i,j)
     *
      * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     *
     * @return model[i][j]
     */
    public DotInfo get(int i, int j) {
        return model[i][j];
    }


   /**
     * The metod <b>step</b> updates the number of steps. It must be called
     * once the model has been updated after the payer selected a new square.
     */
     public void step(){
        numberOfSteps++;
    }

   /**
     * The metod <b>isFinished</b> returns true iff the game is finished, that
     * is, all the nonmined dots are uncovered.
     *
     * @return true if the game is finished, false otherwise
     */
    public boolean isFinished(){
        return numberUncovered + numberOfMines == widthOfGame*heigthOfGame;
    }


   /**
     * Builds a String representation of the model
     *
     * @return String representation of the model
     */
    public String toString(){
        StringBuffer b = new StringBuffer();
        for(int j = 0; j < heigthOfGame; j++){
            for(int i = 0; i < widthOfGame; i++){
                if(model[i][j].isMined()) {
                    b.append("* ");
                } else {
                    b.append(model[i][j].getNeighbooringMines() + " ");
                }
            }
            b.append("\n");
        }
        return b.toString();
    }
}























import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;

/**
 * The class <b>GameView</b> provides the current view of the entire Game. It extends
 * <b>JFrame</b> and lays out a matrix of <b>DotButton</b> (the actual game) and
 * two instances of JButton. The action listener for the buttons is the controller.
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */

public class GameView extends JFrame {


    /**
     * The board is a two dimensionnal array of DotButtons instances
     */
    private DotButton[][] board;


    /**
     * Reference to the model of the game
     */
    private GameModel  gameModel;


    /**
     * Reference to the JLabel label on which the current number of steps is written
     */
    private JLabel nbreOfStepsLabel;
    /**
     * Constructor used for initializing the Frame
     *
     * @param gameModel
     *            the model of the game (already initialized)
     * @param gameController
     *            the controller
     */

    public GameView(GameModel gameModel, GameController gameController) {
        super("MineSweeper -- the ITI 1121 version");

        this.gameModel = gameModel;

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    	setBackground(Color.WHITE);

        JPanel panel = new JPanel();
        panel.setBackground(Color.WHITE);
        panel.setLayout(new GridLayout(gameModel.getHeigth(), gameModel.getWidth()));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 0, 20));
        board = new DotButton[gameModel.getWidth()][gameModel.getHeigth()];

        for (int j = 0; j < gameModel.getHeigth(); j++) {
            for (int i = 0; i < gameModel.getWidth(); i++) {
                board[i][j] = new DotButton(i, j, getIcon(i,j));
                board[i][j].addActionListener(gameController);
                panel.add(board[i][j]);
            }
        }
    	add(panel, BorderLayout.CENTER);

        JButton buttonReset = new JButton("Reset");
        buttonReset.setFocusPainted(false);
        buttonReset.addActionListener(gameController);

        JButton buttonExit = new JButton("Quit");
        buttonExit.setFocusPainted(false);
        buttonExit.addActionListener(gameController);

























/**
 * The class <b>Mineseeper</b> launches the game
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */
public class Minesweeper {


     /**
     * default width of the game.
     */
    public static final int DEFAULT_WIDTH = 20;
     /**
     * default heigth of the game.
     */
    public static final int DEFAULT_HEIGTH = 12;
     /**
     * default number of mines in the game.
     */
    public static final int DEFAULT_MINES = 36;

   /**
     * <b>main</b> of the application. Creates the instance of  GameController
     * and starts the game. If three parameters width, heigth,
     * number of mines are passed, they are used.
     * Otherwise, a default value is used. Defaults values are also
     * used if the paramters are too small (minimum 10 for width,
     * 5 for heigth and 1 for number of mines).
     * Additionally, the maximum number of mines is capped at
     * width*heigth -1
     *
     * @param args
     *            command line parameters
     */
     public static void main(String[] args) {
        int width   = DEFAULT_WIDTH;
        int heigth  = DEFAULT_HEIGTH;
        int numberOfMines = DEFAULT_MINES;

        if (args.length == 3) {
            try{
                width = Integer.parseInt(args[0]);
                if(width<10){
                    System.out.println("Invalid argument, using default...");
                    width = DEFAULT_WIDTH;
                }
                heigth = Integer.parseInt(args[1]);
                if(heigth<5){
                    System.out.println("Invalid argument, using default...");
                    heigth = DEFAULT_HEIGTH;
                }
                numberOfMines = Integer.parseInt(args[2]);
                if(numberOfMines<1){
                    System.out.println("Invalid argument, using default...");
                    numberOfMines = DEFAULT_MINES;
                }
            } catch(NumberFormatException e){
                System.out.println("Invalid argument, using default...");
                width   = DEFAULT_WIDTH;
                heigth  = DEFAULT_HEIGTH;
                numberOfMines = DEFAULT_MINES;
            }
        }
        if(numberOfMines >= width*heigth) {
            System.out.println("Too many mines: " + numberOfMines
                + " mines on " + (width*heigth) + " spots. Using "
                + (width*heigth - 1) + " instead. Good luck!");
            numberOfMines = (width*heigth - 1);
        }

        GameController game = new GameController(width, heigth,numberOfMines);
    }


}




        JPanel control = new JPanel();
        control.setBackground(Color.WHITE);
        nbreOfStepsLabel = new JLabel();
        control.add(nbreOfStepsLabel);
        control.add(buttonReset);
        control.add(buttonExit);

        add(control, BorderLayout.SOUTH);


    	pack();
    	//setResizable(false);
    	setVisible(true);

    }

    /**
     * update the status of the board's DotButton instances based
     * on the current game model, then redraws the view
     */

    public void update(){
        for(int i = 0; i < gameModel.getWidth(); i++){
            for(int j = 0; j < gameModel.getHeigth(); j++){
                board[i][j].setIconNumber(getIcon(i,j));
            }
        }
        nbreOfStepsLabel.setText("Number of steps: " + gameModel.getNumberOfSteps());
        repaint();
    }

    /**
     * returns the icon value that must be used for a given dot
     * in the game
     *
     * @param i
     *            the x coordinate of the dot
     * @param j
     *            the y coordinate of the dot
     * @return the icon to use for the dot at location (i,j)
     */
    private int getIcon(int i, int j){
        if(gameModel.isCovered(i, j)) {
            return DotButton.COVERED;
        } else if (gameModel.isMined(i, j)) {
            if(gameModel.hasBeenClicked(i,j)) {
                return DotButton.CLICKED_MINE;
            } else {
                return DotButton.MINED;
            }
        } else {
            return gameModel.getNeighbooringMines(i,j);
        }
    }


}




























/**
 * Stack Abstract Data Type. A Stack is a linear data structure
 * following last-in-first-out protocol, i.e. the last element
 * that has been added onto the Stack, is the first one to
 * be removed.
 *
 * @author Marcel Turcotte
 */

public interface Stack<E> {

    /**
     * Tests if this Stack is empty.
     *
     * @return true if this Stack is empty; and false otherwise.
     */

    public abstract boolean isEmpty();

    /**
     * Returns a reference to the top element; does not change
     * the state of this Stack.
     *
     * @return The top element of this stack without removing it.
     */

    public abstract E peek();

    /**
     * Removes and returns the element at the top of this stack.
     *
     * @return The top element of this stack.
     */

    public abstract E pop();

    /**
     * Puts an element onto the top of this stack.
     *
     * @param element the element be put onto the top of this stack.
     */

    public abstract void push( E element );

}
