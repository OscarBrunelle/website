import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.LinkedList;

import javax.swing.*;


/**
 * The class <b>GameController</b> is the controller of the game. It is a listener
 * of the view, and has a method <b>play</b> which computes the next
 * step of the game, and  updates model and view.
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */


public class GameController implements ActionListener {

    private GameModel gameModel;
    private GameView gameView;

    /**
     * Constructor used for initializing the controller. It creates the game's view
     * and the game's model instances
     *
     * @param width
     *            the width of the board on which the game will be played
     * @param height
     *            the height of the board on which the game will be played
     * @param numberOfMines
     *            the number of mines hidden in the board
     */
    public GameController() {

        gameModel = new GameModel();
        gameView = new GameView(gameModel,this);
    }


    /**
     * Callback used when the user clicks a button (reset or quit)
     *
     * @param e
     *            the ActionEvent
     */

    public void actionPerformed(ActionEvent e) {

        if (e.getSource() instanceof JButton) {

            if (e.getActionCommand().equals("Reset")) {
                reset();
            }
            else if (e.getActionCommand().equals("Exit")) {
                System.exit(0);
            }
        }

        if (e.getSource() instanceof LandsButton) {

            LandsButton src = (LandsButton) e.getSource();

            play();
        }
    }

    /**
     * resets the game
     */
    private void reset(){
/*
        gameModel.reset();
        gameView.update();*/
    }

    /**
     * <b>play</b> is the method called when the user clicks on a square.
     * If that square is not already clicked, then it applies the logic
     * of the game to uncover that square, and possibly end the game if
     * that square was mined, or possibly uncover some other squares.
     * It then checks if the game
     * is finished, and if so, congratulates the player, showing the number of
     * moves, and gives to options: start a new game, or exit
     * @param width
     *            the selected column
     * @param heigth
     *            the selected line
     */
    private void play(){

      /*if (true) {
            JOptionPane pane = new JOptionPane();
            Object[] options = {"Play Again", "Quit"};
                String message = "Aouch, you lost in "+gameModel.getNumberOfSteps()+" steps! Would you like to play again?";
            pane.showOptionDialog(null, message, "Boom!", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);
            Object selectedValue = pane.getValue();
            if (selectedValue=="Play Again") {
                System.exit(0);
                reset();
            }
            else if (selectedValue=="Quit"){
                System.exit(0);
            }
        }
        else if(gameModel.getNeighbooringMines(width,heigth)==0){
            gameModel.click(width,heigth);
            gameModel.uncover(width,heigth);
            clearZone(gameModel.get(width,heigth));
            gameModel.step();
        }
        else{
            gameModel.click(width,heigth);
            gameModel.uncover(width,heigth);
            gameModel.step();


            if (gameModel.isFinished()) {
                gameModel.uncoverAll();
                gameView.update();

                JOptionPane pane = new JOptionPane();
                Object[] options = {"Play Again", "Quit"};
                String message = "Congratulations, you won in "+gameModel.getNumberOfSteps()+" steps! Would you like to play again?";
                pane.showOptionDialog(null, message, "Won", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);
                Object selectedValue = pane.getValue();
                if (selectedValue=="Play Again") {
                    System.exit(0);
                    reset();
                }
                else if (selectedValue=="Quit"){
                    System.exit(0);
                }
            }
        }
        gameView.update();*/
        }
}
