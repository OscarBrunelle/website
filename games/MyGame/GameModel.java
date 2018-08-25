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

    private java.util.Random generator;
    private int heigthOfGame;
    private LandsInfo[][] model;
    private int numberOfMines;
    private int numberOfSteps;
    private int numberUncovered;
    private int widthOfGame;


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
    public GameModel() {

      //reset();
    }
}
